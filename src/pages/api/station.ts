import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stationId, searchWord, skip, take, orderColumn, order } = req.query;

  let ordering = null;
  if (orderColumn && order) {
    ordering = {
      [orderColumn as string]: order as string,
    };
  }

  if (req.method === "GET" && stationId) {
    try {
      const station = await prismaClient.station.findFirst({
        where: {
          id: Number(stationId),
        },
      });

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

      return res.status(200).json({
        departures: departures.length,
        returns: returns.length,
        ...station,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET" && searchWord) {
    try {
      const result = await prismaClient.station.findMany({
        where: {
          OR: [
            {
              nameFi: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              nameSwe: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              nameEng: {
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
            {
              addressSwe: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              cityFi: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              citySwe: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              operator: {
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

      return res.status(200).json({
        result,
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
          city: station.cityFi,
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
