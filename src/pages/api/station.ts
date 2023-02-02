import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stationId, searchWord, skip, take, orderColumn, order, getAmount } =
    req.query;

  let ordering = null;
  if (orderColumn && order) {
    ordering = {
      [orderColumn as string]: order as string,
    };
  }

  if (req.method === "GET" && stationId && getAmount) {
    try {
      const departures = await prismaClient.journey.findMany({
        where: {
          departureStationId: Number(stationId),
        },
      });

      const returns = await prismaClient.journey.findMany({
        where: {
          returnStationId: Number(stationId),
        },
      });

      const amounts = {
        departures: departures.length,
        returns: returns.length,
      };

      return res.status(200).json(amounts);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET" && stationId) {
    try {
      const result = await prismaClient.station.findUnique({
        where: {
          id: Number(stationId),
        },
      });

      const station = {
        name: result?.nameFi,
        address: result?.addressFi,
        capacity: result?.capacity,
        xCoord: result?.xCoord,
        yCoord: result?.yCoord,
      };

      return res.status(200).json(station);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET" && searchWord) {
    try {
      const result = await prismaClient.station.findMany({
        take: Number(take) || 10,
        skip: Number(skip) || 0,
        where: {
          OR: [
            {
              nameFi: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              addressFi: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: ordering || {
          id: "asc",
        },
      });

      const stations = result.map((station) => {
        return {
          id: station.id,
          name: station.nameFi,
          address: station.addressFi,
        };
      });

      return res.status(200).json({
        stations,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET") {
    try {
      const result = await prismaClient.station.findMany({
        skip: Number(skip) || 0,
        take: Number(take) || 10,
        orderBy: ordering || {
          id: "asc",
        },
      });

      const stations = result.map((station) => {
        return {
          id: station.id,
          name: station.nameFi,
          address: station.addressFi,
        };
      });

      return res.status(200).json(stations);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  return res.status(400).json({ error: "Request method not supported." });
};

export default handler;
