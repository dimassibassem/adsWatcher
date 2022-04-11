/*
  Warnings:

  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `searchId` column on the `Search` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
DROP COLUMN "searchId",
ADD COLUMN     "searchId" SERIAL NOT NULL,
ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("searchId");

-- CreateTable
CREATE TABLE "Article" (
    "searchId" SERIAL NOT NULL,
    "searchId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "categoryId" INTEGER NOT NULL,
    "distance" INTEGER,
    "timestamp" INTEGER NOT NULL,
    "thumbnail" VARCHAR(255),
    "location" VARCHAR(255),
    "externalId" VARCHAR(255) NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "crawlerId" INTEGER NOT NULL,
    "sourceUrl" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("searchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_articleId_key" ON "Article"("articleId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("searchId") ON DELETE RESTRICT ON UPDATE CASCADE;
