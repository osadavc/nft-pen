import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NFT Pen | Mint Your Code Pens As NFTs</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
