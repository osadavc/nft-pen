import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { SessionProvider } from "next-auth/react";

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
      <Head>
        <title>NFT Pen | Mint Your Code Pens As NFTs</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
