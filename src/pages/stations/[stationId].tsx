import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

import { LoadingStates } from "@/types";
import { Station } from "@/types";

export default function Home() {
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState<LoadingStates>(LoadingStates.idle);

  const router = useRouter();
  const { stationId } = router.query;

  useEffect(() => {
    const getStation = async () => {
      try {
        setLoading(LoadingStates.loading);
        const response = await axios.get(`/api/station?stationId=${stationId}`);
        setStation(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(LoadingStates.finished);
    };

    if (stationId) {
      getStation();
    }
  }, [stationId]);

  return (
    <>
      <Head>
        <title>Station | City Bike App</title>
      </Head>
      <main>
        {loading === LoadingStates.loading ? (
          <p>Loading...</p>
        ) : loading === LoadingStates.finished ? (
          <div>
            <h2>{station?.name}</h2>
            <p>Address: {station?.address}</p>
            <p>Capacity: {station?.capacity} bikes</p>
            <p>Amount of departures: {station?.departures}</p>
            <p>Amount of returns: {station?.returns}</p>
          </div>
        ) : (
          <p>No Data</p>
        )}
        <button className="button" onClick={() => router.back()}>
          Return to Search
        </button>
      </main>
    </>
  );
}
