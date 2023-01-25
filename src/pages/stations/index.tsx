import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

enum LoadingStates {
  idle = "idle",
  loading = "loading",
  finished = "finished",
}

enum SortingColumns {
  name = "nameFi",
  address = "addressFi",
}

interface Station {
  id: string;
  name: string;
  address: string;
  departures?: number;
  returns?: number;
}

const upArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-up-short"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
    />
  </svg>
);

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-down-short"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
    />
  </svg>
);

export default function Home() {
  const [stations, setStations] = useState<Station[] | null>(null);
  const [loading, setLoading] = useState<LoadingStates>(LoadingStates.idle);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortingColumn, setSortingColumn] = useState<SortingColumns>(
    SortingColumns.name
  );
  const [ascending, setAscending] = useState<boolean>(true);

  const skip = page * pageSize;

  useEffect(() => {
    const getInitialStations = async () => {
      try {
        setLoading(LoadingStates.loading);
        const response = await axios.get(
          `/api/station?skip=${skip}&take=${pageSize}&orderColumn=${sortingColumn}&order=${
            ascending ? "asc" : "desc"
          }`
        );
        setStations(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(LoadingStates.finished);
    };

    getInitialStations();
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
        <title>Stations | Helsinki City Bike App</title>
      </Head>
      <main>
        <h2>Stations</h2>
        {loading === LoadingStates.idle ? null : loading ===
          LoadingStates.loading ? (
          <p>Loading...</p>
        ) : loading === LoadingStates.finished && stations ? (
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
                    onClick={() => handleSorting(SortingColumns.name)}
                    style={{ cursor: "pointer" }}
                  >
                    Name
                    {sortingColumn === SortingColumns.name && ascending
                      ? upArrow
                      : null}
                    {sortingColumn === SortingColumns.name &&
                    ascending === false
                      ? downArrow
                      : null}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSorting(SortingColumns.address)}
                    style={{ cursor: "pointer" }}
                  >
                    Address
                    {sortingColumn === SortingColumns.address && ascending
                      ? upArrow
                      : null}
                    {sortingColumn === SortingColumns.address &&
                    ascending === false
                      ? downArrow
                      : null}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station) => {
                  return (
                    <tr key={station.id}>
                      <td>
                        <Link href={`/station/${station.id}`}>
                          {station.name}
                        </Link>
                      </td>
                      <td>{station.address}</td>
                    </tr>
                  );
                })}
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
        ) : (
          <p>No data</p>
        )}
      </main>
    </>
  );
}
