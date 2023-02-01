import journeyApi from "../src/pages/api/journey";
import { prismaClient } from "../src/client";
import { createMocks } from "node-mocks-http";
import mockJourneys from "./mockJourneys.json";

const seedDatabase = async (): Promise<void> => {
  await prismaClient.journey.deleteMany({});
  await prismaClient.journey.createMany({
    data: mockJourneys,
  });

  return;
};

describe("/api/journey endpoint", () => {
  beforeAll(async () => {
    return seedDatabase();
  });

  it("should return 10 stations with GET request with no params", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await journeyApi(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(JSON.parse(res._getData())).toHaveLength(10);
  });

  it("should return 5 journeys with GET request when skipping 5 journeys", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        skip: 5,
      },
    });

    await journeyApi(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(JSON.parse(res._getData())).toHaveLength(5);
  });
});
