import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";

import { LoadingStates } from "@/types";
import { Journey } from "@/types";

import toHMS from "@/helpers/toHMS";

enum SortingColumns {
  departureDate = "departureDate",
  returnDate = "returnDate",
  departureStationName = "departureStationName",
  returnStationName = "returnStationName",
  coveredDistance = "coveredDistance",
  duration = "duration",
}

export default function Home() {
  const [journeys, setJourneys] = useState<Journey[] | null>(null);
  const [loading, setLoading] = useState<LoadingStates>(LoadingStates.idle);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortingColumn, setSortingColumn] = useState<SortingColumns>(
    SortingColumns.departureStationName
  );
  const [ascending, setAscending] = useState<boolean>(true);

  const skip = page * pageSize;

  useEffect(() => {
    const getInitialJourneys = async () => {
      try {
        setLoading(LoadingStates.loading);
        const response = await axios.get(
          `/api/journey?skip=${skip}&take=${pageSize}&orderColumn=${sortingColumn}&order=${
            ascending ? "asc" : "desc"
          }`
        );
        setJourneys(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(LoadingStates.finished);
    };

    getInitialJourneys();
  }, [skip, page, pageSize, sortingColumn, ascending]);

  const handleSorting = (column: SortingColumns) => {
    if (column === sortingColumn) {
      setAscending(!ascending);
    } else {
      setAscending(true);
      setSortingColumn(column);
    }
  };

  return (
    <>
      <Head>
        <title>Journeys | Helsinki City Bike App</title>
      </Head>
      <main>
        <h2>Journeys</h2>
        <>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Results per page: {pageSize}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setPageSize(10);
                    setPage(0);
                  }}
                >
                  10
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setPageSize(20);
                    setPage(0);
                  }}
                >
                  20
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setPageSize(30);
                    setPage(0);
                  }}
                >
                  30
                </a>
              </li>
            </ul>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={() => handleSorting(SortingColumns.departureDate)}
                  style={{ cursor: "pointer" }}
                >
                  Departure Date
                  {sortingColumn === SortingColumns.departureDate &&
                  ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.departureDate &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
                <th
                  scope="col"
                  onClick={() =>
                    handleSorting(SortingColumns.departureStationName)
                  }
                  style={{ cursor: "pointer" }}
                >
                  Departure Station
                  {sortingColumn === SortingColumns.departureStationName &&
                  ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.departureStationName &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSorting(SortingColumns.returnDate)}
                  style={{ cursor: "pointer" }}
                >
                  Return Date
                  {sortingColumn === SortingColumns.returnDate && ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.returnDate &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
                <th
                  scope="col"
                  onClick={() =>
                    handleSorting(SortingColumns.returnStationName)
                  }
                  style={{ cursor: "pointer" }}
                >
                  Return Station
                  {sortingColumn === SortingColumns.returnStationName &&
                  ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.returnStationName &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSorting(SortingColumns.coveredDistance)}
                  style={{ cursor: "pointer" }}
                >
                  Distance
                  {sortingColumn === SortingColumns.coveredDistance &&
                  ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.coveredDistance &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSorting(SortingColumns.duration)}
                  style={{ cursor: "pointer" }}
                >
                  Duration
                  {sortingColumn === SortingColumns.duration && ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.duration &&
                  ascending === false ? (
                    <Image
                      src="/icons/downarrow.svg"
                      alt="downArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading === LoadingStates.idle ? null : loading ===
                LoadingStates.loading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : loading === LoadingStates.finished && journeys ? (
                journeys.map((journey) => {
                  const departureDate = new Date(journey.departureDate);
                  const returnDate = new Date(journey.returnDate);
                  const roundedDistance =
                    Math.round(
                      (journey.coveredDistance / 1000 + Number.EPSILON) * 100
                    ) / 100;
                  return (
                    <tr key={journey.id}>
                      <td>{departureDate.toLocaleString()}</td>
                      <td>{journey.departureStationName}</td>
                      <td>{returnDate.toLocaleString()}</td>
                      <td>{journey.returnStationName}</td>
                      <td>{roundedDistance}km</td>
                      <td>{toHMS(journey.duration)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No data</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <p>Page: {page + 1}</p>
            {page > 1 ? (
              <button onClick={() => setPage(0)}>First Page</button>
            ) : null}
            {page > 0 ? (
              <button onClick={() => setPage(page - 1)}>Previous Page</button>
            ) : null}
            <button onClick={() => setPage(page + 1)}>Next Page</button>
          </div>
        </>
      </main>
    </>
  );
}
