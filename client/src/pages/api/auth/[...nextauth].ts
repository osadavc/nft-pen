import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import * as env from "config";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    }),
  ],
});
