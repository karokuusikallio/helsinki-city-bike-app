import stationApi from "../src/pages/api/station";
import { prismaClient } from "../src/client";
import { createMocks } from "node-mocks-http";
import mockStations from "./mockStations.json";

const seedDatabase = async (): Promise<void> => {
  await prismaClient.station.deleteMany({});
  await prismaClient.station.createMany({
    data: mockStations,
  });

  return;
};

describe("/api/station endpoint", () => {
  beforeAll(async () => {
    return seedDatabase();
  });

  it("should return 10 stations with GET request with no params", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await stationApi(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(JSON.parse(res._getData())).toHaveLength(10);
  });

  it("should return 5 stations with GET request when skipping 5 stations", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        skip: 5,
      },
    });

    await stationApi(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(JSON.parse(res._getData())).toHaveLength(5);
  });

  it("should find a station with stationId", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        stationId: mockStations[5].id,
      },
    });

    await stationApi(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(JSON.parse(res._getData()).name).toEqual(mockStations[5].nameFi);
  });
});
