/*
  Warnings:

  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Search` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Article" (
    "searchId" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT,
    "categoryId" VARCHAR(255) NOT NULL,
    "distance" TEXT,
    "timestamp" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255),
    "externalId" VARCHAR(255) NOT NULL,
    "sourceId" VARCHAR(255) NOT NULL,
    "crawlerId" VARCHAR(255) NOT NULL,
    "sourceUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
