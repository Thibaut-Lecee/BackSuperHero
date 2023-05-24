const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllInterventions = async (req, res) => {
  try {
    const allInterventions = await prisma.intervention.findMany({
      include: {
        incident: true,
        superhero: true,
        status: {
          select: {
            status: true,
            superhero: {
              select: {
                nom: true,
                adresse: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ message: "All interventions", allInterventions });
  } catch (error) {
    res.status(400).json({ message: "Interventions not found", error });
  }
};

module.exports = { getAllInterventions };
