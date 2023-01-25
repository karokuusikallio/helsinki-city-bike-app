import type { AppProps } from "next/app";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
