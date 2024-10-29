/*
  Warnings:

  - You are about to drop the column `registerConferenceId` on the `Revision` table. All the data in the column will be lost.
  - Added the required column `submissionId` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_registerConferenceId_fkey";

-- AlterTable
ALTER TABLE "Revision" DROP COLUMN "registerConferenceId",
ADD COLUMN     "submissionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "RegisterConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
