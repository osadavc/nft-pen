import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

import * as env from "config";

const isServer = () => typeof window === "undefined";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(message);
    });
  }
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession();

  const modifiedHeader = {
    headers: {
      ...headers,
    },
  };

  if (isServer()) {
    (modifiedHeader.headers as any)["x-hasura-admin-secret"] =
      env.hasuraAdminKey;
  } else {
    (modifiedHeader.headers as any).authorization = session?.token
      ? `Bearer ${session.token}`
      : "";
  }

  return modifiedHeader;
});

const link = from([
  authLink,
  errorLink,
  new HttpLink({ uri: env.graphqlEndpoint }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default apolloClient;
