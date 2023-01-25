-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL,
    "fid" INTEGER NOT NULL,
    "nameFi" TEXT NOT NULL,
    "nameSwe" TEXT NOT NULL,
    "nameEng" TEXT NOT NULL,
    "addressFi" TEXT NOT NULL,
    "addressSwe" TEXT NOT NULL,
    "cityFi" TEXT NOT NULL,
    "citySwe" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "departureStationId" INTEGER NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnStationId" INTEGER NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "coveredDistance" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);
