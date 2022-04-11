/*
  Warnings:

  - You are about to drop the `search` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "search";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "searchId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatarUrl" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("searchId")
);

-- CreateTable
CREATE TABLE "Search" (
    "searchId" TEXT NOT NULL,
    "query" VARCHAR(255) NOT NULL,
    "locationId" INTEGER,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("searchId")
);

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("searchId") ON DELETE RESTRICT ON UPDATE CASCADE;
