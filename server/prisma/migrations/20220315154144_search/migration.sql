-- CreateTable
CREATE TABLE "search" (
    "id" TEXT NOT NULL,
    "query" VARCHAR(255) NOT NULL,
    "location" INTEGER,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,

    CONSTRAINT "search_pkey" PRIMARY KEY ("id")
);
