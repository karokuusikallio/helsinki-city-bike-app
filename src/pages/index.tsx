import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Helsinki City Bike App</title>
      </Head>
      <main>
        <p className="hero-text">
          Welcome to Helsinki City Bike App. Here you can see all bike journeys
          made in the summer of 2021 and available stations at the time.
        </p>
        <Image
          src="/pexels-pixabay-248762.jpg"
          height={256}
          width={384}
          alt="bike-lane"
        />
      </main>
    </>
  );
}
