/*
  Warnings:

  - You are about to drop the `ArticlesInSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticlesInSearch" DROP CONSTRAINT "ArticlesInSearch_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticlesInSearch" DROP CONSTRAINT "ArticlesInSearch_searchId_fkey";

-- DropTable
DROP TABLE "ArticlesInSearch";

-- CreateTable
CREATE TABLE "_ArticleToSearch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToSearch_AB_unique" ON "_ArticleToSearch"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToSearch_B_index" ON "_ArticleToSearch"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToSearch" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToSearch" ADD FOREIGN KEY ("B") REFERENCES "Search"("id") ON DELETE CASCADE ON UPDATE CASCADE;
