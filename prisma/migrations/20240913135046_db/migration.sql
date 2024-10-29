/*
  Warnings:

  - You are about to drop the column `reviewId` on the `ReviewComments` table. All the data in the column will be lost.
  - Added the required column `submissionId` to the `ReviewComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ReviewComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReviewComments" DROP CONSTRAINT "ReviewComments_reviewId_fkey";

-- AlterTable
ALTER TABLE "ReviewComments" DROP COLUMN "reviewId",
ADD COLUMN     "submissionId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewComments" ADD CONSTRAINT "ReviewComments_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "RegisterConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComments" ADD CONSTRAINT "ReviewComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
