import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, take, orderColumn, order } = req.query;

  let ordering = null;
  if (orderColumn && order) {
    ordering = {
      [orderColumn as string]: order as string,
    };
    console.log(ordering);
  }

  if (req.method === "GET" && cursor) {
    try {
      const journeys = await prismaClient.journey.findMany({
        skip: 1,
        take: Number(take) || 10,
        cursor: {
          id: cursor as string,
        },
        orderBy: ordering || {
          id: "asc",
        },
      });

      return res.status(200).json(journeys);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  if (req.method === "GET") {
    try {
      const journeys = await prismaClient.journey.findMany({
        take: Number(take) || 10,
        orderBy: ordering || {
          id: "asc",
        },
      });

      return res.status(200).json(journeys);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  return res.status(400).json({ error: "Request method not supported." });
};

export default handler;
