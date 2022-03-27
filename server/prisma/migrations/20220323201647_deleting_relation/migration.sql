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
