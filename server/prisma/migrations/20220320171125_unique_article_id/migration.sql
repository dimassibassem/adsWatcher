/*
  Warnings:

  - A unique constraint covering the columns `[articleId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_articleId_key" ON "Article"("articleId");
