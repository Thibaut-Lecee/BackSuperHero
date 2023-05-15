-- DropForeignKey
ALTER TABLE "Intervention" DROP CONSTRAINT "Intervention_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Intervention" DROP CONSTRAINT "Intervention_superheroId_fkey";

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
