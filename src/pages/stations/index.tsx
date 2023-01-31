import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import { LoadingStates } from "@/types";
import { Station } from "@/types";

enum SortingColumns {
  name = "nameFi",
  address = "addressFi",
}

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
                  {sortingColumn === SortingColumns.name && ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.name &&
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
                  onClick={() => handleSorting(SortingColumns.address)}
                  style={{ cursor: "pointer" }}
                >
                  Address
                  {sortingColumn === SortingColumns.address && ascending ? (
                    <Image
                      src="/icons/uparrow.svg"
                      alt="upArrow"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {sortingColumn === SortingColumns.address &&
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
              ) : loading === LoadingStates.finished && stations ? (
                stations.map((station) => {
                  return (
                    <tr key={station.id}>
                      <td>
                        <Link href={`/stations/${station.id}`}>
                          {station.name}
                        </Link>
                      </td>
                      <td>{station.address}</td>
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
