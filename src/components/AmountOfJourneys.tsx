import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingStates } from "@/types";

interface AmountOfJourneys {
  departures: number;
  returns: number;
}

interface AmountProps {
  stationId: string;
}

const AmountOfJourneys = ({ stationId }: AmountProps) => {
  const [loading, setLoading] = useState<LoadingStates>(LoadingStates.idle);
  const [amountOfJourneys, setAmountOfJourneys] = useState<AmountOfJourneys>();

  useEffect(() => {
    const getAmountOfJourneys = async () => {
      try {
        setLoading(LoadingStates.loading);
        const response = await axios.get(
          `/api/station?getAmount=true&stationId=${stationId}`
        );
        setAmountOfJourneys(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(LoadingStates.finished);
    };

    if (stationId) {
      getAmountOfJourneys();
    }
  }, [stationId]);

  return (
    <>
      {loading === LoadingStates.loading ? (
        <p>Getting data on journey amounts...</p>
      ) : loading === LoadingStates.finished &&
        amountOfJourneys &&
        amountOfJourneys.departures &&
        amountOfJourneys.returns ? (
        <div>
          <p>Amount of departures: {amountOfJourneys.departures}</p>
          <p>Amount of returns: {amountOfJourneys.returns}</p>
        </div>
      ) : (
        <p>No data on amount of journeys.</p>
      )}
    </>
  );
};

export default AmountOfJourneys;
