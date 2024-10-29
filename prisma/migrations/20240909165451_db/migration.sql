/*
  Warnings:

  - Made the column `comments` on table `ReviewPaper` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sendReview` on table `ReviewPaper` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `ReviewPaper` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReviewPaper" ALTER COLUMN "comments" SET NOT NULL,
ALTER COLUMN "sendReview" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
