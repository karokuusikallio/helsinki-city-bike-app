import { Journey } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { skip, take, orderColumn, order, searchWord } = req.query;

  let ordering = null;
  if (orderColumn && order) {
    ordering = {
      [orderColumn as string]: order as string,
    };
  }

  if (req.method === "GET" && searchWord) {
    try {
      const result = await prismaClient.journey.findMany({
        take: Number(take) || 10,
        skip: Number(skip) || 0,
        where: {
          OR: [
            {
              departureStationName: {
                contains: searchWord as string,
                mode: "insensitive",
              },
            },
            {
              returnStationName: {
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

      const journeys = result.map(
        ({
          id,
          departureDate,
          returnDate,
          departureStationName,
          returnStationName,
          coveredDistance,
          duration,
        }: Journey) => {
          return {
            id,
            departureDate,
            returnDate,
            departureStationName,
            returnStationName,
            coveredDistance,
            duration,
          };
        }
      );

      return res.status(200).json({
        journeys,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET") {
    try {
      const result = await prismaClient.journey.findMany({
        take: Number(take) || 10,
        skip: Number(skip) || 0,
        orderBy: ordering || {
          id: "asc",
        },
      });

      const journeys = result.map(
        ({
          id,
          departureDate,
          returnDate,
          departureStationName,
          returnStationName,
          coveredDistance,
          duration,
        }: Journey) => {
          return {
            id,
            departureDate,
            returnDate,
            departureStationName,
            returnStationName,
            coveredDistance,
            duration,
          };
        }
      );

      return res.status(200).json(journeys);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  return res.status(400).json({ error: "Request method not supported." });
};

export default handler;
