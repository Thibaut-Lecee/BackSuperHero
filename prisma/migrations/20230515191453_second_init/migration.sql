-- CreateTable
CREATE TABLE "_IncidentToSuperhero" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IncidentToSuperhero_AB_unique" ON "_IncidentToSuperhero"("A", "B");

-- CreateIndex
CREATE INDEX "_IncidentToSuperhero_B_index" ON "_IncidentToSuperhero"("B");

-- AddForeignKey
ALTER TABLE "_IncidentToSuperhero" ADD CONSTRAINT "_IncidentToSuperhero_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToSuperhero" ADD CONSTRAINT "_IncidentToSuperhero_B_fkey" FOREIGN KEY ("B") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
