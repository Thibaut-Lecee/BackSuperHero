const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
require("dotenv").config();
const baseUrl = process.env.BASE_URL || "http://localhost:4000";

const incidentTypes = [
  "Incendie",
  "Accident routier",
  "Accident fluviale",
  "Accident aérien",
  "Eboulement",
  "Invasion de serpent",
  "Fuite de gaz",
  "Manifestation",
  "Braquage",
  "Evasion d`un prisonnier",
];

const incidentStatus = ["En attente", "En cours", "Terminé"];
const phoneNumbers = new Set();

const generatePhoneNumber = () => {
  let phoneNumber;
  do {
    phoneNumber = `+33${faker.number.int({ min: 600000000, max: 799999999 })}`;
  } while (phoneNumbers.has(phoneNumber));

  phoneNumbers.add(phoneNumber);

  return phoneNumber;
};

const generateLocation = () => {
  const latitude = faker.location.latitude({ min: 41.590101, max: 51.148506 });
  const longitude = faker.location.longitude({ min: -4.65, max: 9.45 });

  return `${latitude}, ${longitude}`;
};

const generateStatus = () => {
  const index = faker.number.int({ min: 0, max: 2 });
  return incidentStatus[index];
};

interface Incident {
  id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const assignSuperheroToIntervention = (status: string) => {
  if (status === "En attente") {
    return null;
  } else {
    return faker.number.int({ min: 1, max: 10 });
  }
};

async function main() {
  // Create 10 superheroes
  // For each superhero, create 1 to 3 incidents
  const incidents: Incident[] = [];
  for (const incidentType of incidentTypes) {
    const svgPath = `${baseUrl}/assets/Incidents/${encodeURIComponent(
      incidentType
    )}.png`;
    const incident = await prisma.incident.create({
      data: {
        type: incidentType,
        svg: svgPath,
      },
    });
    incidents.push(incident);
  }

  // Create 10 superheroes
  for (let i = 0; i < 10; i++) {
    const numIncidents = faker.number.int({ min: 1, max: 3 });
    const superheroIncidents = faker.helpers
      .shuffle(incidents)
      .slice(0, numIncidents);
    const svgPath = `${baseUrl}/assets/Heros/${encodeURIComponent(
      "IconHero.png"
    )}`;
    const superhero = await prisma.superhero.create({
      data: {
        nom: faker.person.firstName(),
        adresse: generateLocation(),
        phoneNumber: generatePhoneNumber(),
        svg: svgPath,
        incidents: {
          connect: superheroIncidents.map((incident: Incident) => ({
            id: incident.id,
          })),
        },
      },
    });

    // Create an intervention for each incident
    let ongoingInterventionExists = false;
    for (const incident of superheroIncidents) {
      let status = generateStatus();
      // Check if superhero already has an 'En cours' intervention
      if (status === "En cours" && ongoingInterventionExists) {
        status = "Terminé";
      } else if (status === "En cours" && !ongoingInterventionExists) {
        ongoingInterventionExists = true;
      }
      if (status === "En attente") {
        await prisma.intervention.create({
          data: {
            incidentId: incident.id,
            adresse: generateLocation(),
            superheroId: superhero.id,
            status: {
              create: {
                status: status,
              },
            },
          },
        });
      } else {
        await prisma.intervention.create({
          data: {
            incidentId: incident.id,
            adresse: generateLocation(),
            superheroId: superhero.id,
            status: {
              create: {
                status: status,
                superheroId: superhero.id,
              },
            },
          },
        });
      }
    }
  }

  console.log("Done seeding database.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
