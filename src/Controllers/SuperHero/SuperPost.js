const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = new PrismaClient();
const createSuperHero = async (req, res) => {
  const { nom, email, phoneNumber, incidents, password, adresse } = req.body;
  const findHero = await prisma.superhero.findFirst({
    where: {
      OR: [
        {
          nom: nom,
        },
        {
          phoneNumber: phoneNumber,
        },
      ],
    },
  });
  if (findHero) {
    console.log(findHero);
    return res.status(400).json({
      message: `Nom de super héro ${findHero.nom} ou numéro déjà pris ${findHero.phoneNumber}`,
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      if (incidents && incidents.length > 0) {
        const validIncidents = incidents.filter((id) => id !== null);
        if (validIncidents.length > 0) {
          const findIncidents = await prisma.incident.findMany({
            where: {
              id: {
                in: validIncidents,
              },
            },
          });
          const newHero = await prisma.superhero.create({
            data: {
              nom: nom,
              email: email,
              phoneNumber: phoneNumber,
              password: hashedPassword,
              adresse: `${adresse.lat}, ${adresse.lng}`,
              incidents: {
                connect: findIncidents.map((incident) => ({ id: incident.id })),
              },
            },
          });
          res.status(200).json({ message: "Hero crée", newHero });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Erreur lors de la création" });
    }
  }
};

const loginSuperHero = async (req, res) => {
  const { nom, password } = req.body;
  try {
    const findHero = await prisma.superhero.findFirst({
      where: {
        nom: nom,
      },
    });
    if (findHero) {
      const dehashedPassword = await bcrypt.compare(
        password,
        findHero.password
      );
      if (dehashedPassword) {
        const token = jwt.sign(
          {
            nom: findHero.nom,
            adresse: findHero.adresse,
            phoneNumber: findHero.phoneNumber,
          },
          process.env.SECRET_KEY
        );

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json({ message: "Bienvenu héro", token });
      } else {
        res.status(400).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Aucun héro n'a été trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Erreur lors de la connexion" });
  }
};

module.exports = { createSuperHero, loginSuperHero };
