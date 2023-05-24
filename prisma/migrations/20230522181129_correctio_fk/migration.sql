/*
  Warnings:

  - You are about to drop the column `statusId` on the `Incident` table. All the data in the column will be lost.
  - The primary key for the `Intervention` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `StatusIncident` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IncidentToSuperhero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Intervention" DROP CONSTRAINT "Intervention_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Intervention" DROP CONSTRAINT "Intervention_superheroId_fkey";

-- DropForeignKey
ALTER TABLE "_IncidentToSuperhero" DROP CONSTRAINT "_IncidentToSuperhero_A_fkey";

-- DropForeignKey
ALTER TABLE "_IncidentToSuperhero" DROP CONSTRAINT "_IncidentToSuperhero_B_fkey";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "statusId";

-- AlterTable
ALTER TABLE "Intervention" DROP CONSTRAINT "Intervention_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "superheroId" DROP NOT NULL,
ADD CONSTRAINT "Intervention_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "StatusIncident";

-- DropTable
DROP TABLE "_IncidentToSuperhero";

-- CreateTable
CREATE TABLE "StatusIntervention" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusIntervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SuperheroIncidents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SuperheroIncidents_AB_unique" ON "_SuperheroIncidents"("A", "B");

-- CreateIndex
CREATE INDEX "_SuperheroIncidents_B_index" ON "_SuperheroIncidents"("B");

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusIntervention" ADD CONSTRAINT "StatusIntervention_id_fkey" FOREIGN KEY ("id") REFERENCES "Intervention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SuperheroIncidents" ADD CONSTRAINT "_SuperheroIncidents_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SuperheroIncidents" ADD CONSTRAINT "_SuperheroIncidents_B_fkey" FOREIGN KEY ("B") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
