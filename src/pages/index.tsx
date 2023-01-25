import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Helsinki City Bike App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Helsinki City Bike App</h1>
      </main>
    </>
  );
}
