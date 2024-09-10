/*
  Warnings:

  - You are about to drop the column `comments` on the `ReviewPaper` table. All the data in the column will be lost.
  - You are about to drop the column `sendReview` on the `ReviewPaper` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ReviewPaper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReviewPaper" DROP COLUMN "comments",
DROP COLUMN "sendReview",
DROP COLUMN "status";
