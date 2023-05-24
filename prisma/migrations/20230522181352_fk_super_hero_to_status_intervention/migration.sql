-- DropForeignKey
ALTER TABLE "StatusIntervention" DROP CONSTRAINT "StatusIntervention_id_fkey";

-- AlterTable
ALTER TABLE "StatusIntervention" ADD COLUMN     "superheroId" INTEGER;

-- AddForeignKey
ALTER TABLE "StatusIntervention" ADD CONSTRAINT "StatusIntervention_id_fkey" FOREIGN KEY ("id") REFERENCES "Intervention"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusIntervention" ADD CONSTRAINT "StatusIntervention_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE SET NULL ON UPDATE CASCADE;
