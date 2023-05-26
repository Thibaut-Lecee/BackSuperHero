const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const incidentPost = async (req, res) => {
  const { lat, lng, incident, status } = req.body;
  const address = `${lat}, ${lng}`;
  try {
    const existingIntervention = await prisma.intervention.findFirst({
      where: {
        incidentId: incident,
        adresse: address,
      },
      include: {
        incident: true, // Include related incident details
      },
    });
    if (existingIntervention) {
      return res.status(400).json({ message: "Intervention already exists" });
    }
    const newIntervention = await prisma.intervention.create({
      data: {
        incidentId: incident,
        adresse: address,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: {
          create: {
            status: status,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      include: {
        status: true,
      },
    });
    const svg = await prisma.incident.findFirst({
      where: {
        id: incident,
      },
      select: {
        svg: true,
      },
    });
    console.log(svg);
    res.status(201).json({ newIntervention, svg });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not create intervention" });
  }
};
module.exports = {
  incidentPost,
};
