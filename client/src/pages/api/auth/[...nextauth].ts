import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

import * as env from "config";
import { JWT } from "next-auth/jwt";
import apolloClient from "utils/apolloClient";

import {
  AddNewUserMutation,
  AddNewUserMutationVariables,
} from "graphql/users/mutations/addNewUser.generated";
import {
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
} from "graphql/users/queries/getUserById.generated";

import addNewUser from "graphql/users/mutations/addNewUser.gql";
import getUserById from "graphql/users/queries/getUserById.gql";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/",
  },
  jwt: {
    encode: async ({ secret, token }) => {
      return jwt.sign(
        {
          ...token,
          userId: token?.id,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 30,
          iat: Math.floor(Date.now() / 1000),
        },
        secret
      );
    },
    decode: async ({ secret, token }) =>
      jwt.verify(token!, secret, { algorithms: ["HS256"] }) as JWT,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await apolloClient.query<
          GetUserByIdQuery,
          GetUserByIdQueryVariables
        >({
          query: getUserById,
          variables: {
            id: user.id,
          },
        });

        if (existingUser.data.users_by_pk?.id) {
          return true;
        }

        const updatedUser = await apolloClient.mutate<
          AddNewUserMutation,
          AddNewUserMutationVariables
        >({
          mutation: addNewUser,
          variables: {
            email: user.email ?? "",
            id: user.id,
            name: user.name ?? "",
            picture: user.image ?? "",
          },
        });

        return !!updatedUser.data?.insert_users_one?.id;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
      const encodedToken = jwt.sign(token, env.nextauthSecret, {
        algorithm: "HS256",
      });

      session.id = token.id;
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      const isUserSignedIn = user ? true : false;

      if (isUserSignedIn) {
        token.id = user?.id.toString();
        token.sub = user?.id.toString();
        token.name = user?.name;
        token.email = user?.email;
        token["https://hasura.io/jwt/claims"] = {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": user?.id.toString(),
        };
      }
      return Promise.resolve(token);
    },
  },
});
