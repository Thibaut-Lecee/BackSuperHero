/*
  Warnings:

  - Added the required column `statusId` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StatusIncident" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusIncident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusIncident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
