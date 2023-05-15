-- CreateTable
CREATE TABLE "Superhero" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervention" (
    "superheroId" INTEGER NOT NULL,
    "incidentId" INTEGER NOT NULL,
    "adresse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intervention_pkey" PRIMARY KEY ("superheroId","incidentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Superhero_phoneNumber_key" ON "Superhero"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
