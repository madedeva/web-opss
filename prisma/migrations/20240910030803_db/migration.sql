/*
  Warnings:

  - You are about to drop the `ReviewComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReviewComments" DROP CONSTRAINT "ReviewComments_reviewId_fkey";

-- DropTable
DROP TABLE "ReviewComments";
