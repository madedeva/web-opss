-- CreateTable
CREATE TABLE "ReviewComments" (
    "id" SERIAL NOT NULL,
    "comments" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sendReview" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "ReviewComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReviewComments" ADD CONSTRAINT "ReviewComments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ReviewPaper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
