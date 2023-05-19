/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Superhero` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Superhero" ADD COLUMN     "email" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Superhero_email_key" ON "Superhero"("email");
