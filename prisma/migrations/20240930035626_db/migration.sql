-- CreateTable
CREATE TABLE "CoOperator" (
    "id" SERIAL NOT NULL,
    "conferenceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CoOperator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoOperator" ADD CONSTRAINT "CoOperator_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoOperator" ADD CONSTRAINT "CoOperator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
