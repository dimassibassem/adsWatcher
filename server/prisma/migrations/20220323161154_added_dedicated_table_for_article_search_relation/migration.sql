/*
  Warnings:

  - You are about to drop the `_ArticleToSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToSearch" DROP CONSTRAINT "_ArticleToSearch_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToSearch" DROP CONSTRAINT "_ArticleToSearch_B_fkey";

-- DropTable
DROP TABLE "_ArticleToSearch";

-- CreateTable
CREATE TABLE "ArticlesInSearch" (
    "searchId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "ArticlesInSearch_pkey" PRIMARY KEY ("searchId","articleId")
);

-- AddForeignKey
ALTER TABLE "ArticlesInSearch" ADD CONSTRAINT "ArticlesInSearch_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("searchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesInSearch" ADD CONSTRAINT "ArticlesInSearch_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("searchId") ON DELETE RESTRICT ON UPDATE CASCADE;
