-- CreateTable
CREATE TABLE "search" (
    "searchId" TEXT NOT NULL,
    "query" VARCHAR(255) NOT NULL,
    "location" INTEGER,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,

    CONSTRAINT "search_pkey" PRIMARY KEY ("searchId")
);
