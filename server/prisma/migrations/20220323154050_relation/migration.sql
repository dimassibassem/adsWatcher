-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_searchId_fkey";

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
ALTER TABLE "_ArticleToSearch" ADD FOREIGN KEY ("A") REFERENCES "Article"("searchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToSearch" ADD FOREIGN KEY ("B") REFERENCES "Search"("searchId") ON DELETE CASCADE ON UPDATE CASCADE;
