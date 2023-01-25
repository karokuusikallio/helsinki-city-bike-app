import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Helsinki City Bike App</title>
      </Head>
      <main>
        <h2>Home</h2>
      </main>
    </>
  );
}
