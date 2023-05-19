const bcrypt = require("bcrypt");

const createSuperHero = async (req, res) => {
  const { nom, email, phoneNumber, incidents, password, adresse } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(req.body);
};

module.exports = { createSuperHero };
