/*
  Warnings:

  - Added the required column `password` to the `Superhero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Superhero" ADD COLUMN     "password" TEXT NOT NULL;
