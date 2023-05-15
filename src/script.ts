const { PrismaClient } = require('@prisma/client')
const {  faker } = require('@faker-js/faker');
const prisma = new PrismaClient()

const incidentTypes = [
  'Incendie',
  'Accident routier',
  'Accident fluviale',
  'Accident aérien',
  'Eboulement',
  'Invasion de serpent',
  'Fuite de gaz',
  'Manifestation',
  'Braquage',
  'Evasion d’un prisonnier',
]

// Start from a base phone number
const phoneNumbers = new Set();

// Function to generate a unique phone number
function generatePhoneNumber() {
  let phoneNumber;
  do {
    // Generate a 9-digit number and prepend with '+33'
    phoneNumber = `+33${faker.number.int({ min: 600000000, max: 799999999 })}`;
  } while (phoneNumbers.has(phoneNumber));

  // Add the generated number to the set
  phoneNumbers.add(phoneNumber);

  return phoneNumber;
}

interface Incident {
  id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

async function main() {
  // Create 50 superheroes
     // For each superhero, create 1 to 3 incidents
     const incidents: Incident[] = [];
for (const incidentType of incidentTypes) {
  const incident = await prisma.incident.create({
    data: {
      type: incidentType,
    },
  });
  incidents.push(incident);
}

     // Create 50 superheroes
for (let i = 0; i < 50; i++) {
  // Select 1 to 3 random incidents
  const numIncidents = faker.number.int({ min: 1, max: 3 });
  const superheroIncidents = faker.helpers.shuffle(incidents).slice(0, numIncidents);

  const superhero = await prisma.superhero.create({
    data: {
      nom: faker.person.firstName(),
      adresse: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      phoneNumber: generatePhoneNumber(),
      incidents: {
        connect: superheroIncidents.map((incident : Incident) => ({ id: incident.id })),
      },
    },
  });

  // Create an intervention for each incident
  for (const incident of superheroIncidents) {
    await prisma.intervention.create({
      data: {
        superheroId: superhero.id,
        incidentId: incident.id,
        adresse: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      },
    });
  }
}

  console.log('Data generation complete')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
