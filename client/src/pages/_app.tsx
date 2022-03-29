import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { Toaster } from "react-hot-toast";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "utils/apolloClient";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>NFT Pen | Mint Your Code Pens As NFTs</title>
          <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default MyApp;
