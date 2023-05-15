const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const getAllHeros = async (req, res) => {
    try {

        const allHeros = await prisma.superhero.findMany({
            include: {
                incidents: true,
            },
        });
        res.status(200).json({
            heros: allHeros
        })
    } catch (error) {
        console.log(error);
    }
}
    

const getHeroByName = async (req,res) => {
    try {
        const name = req.query
        console.log(name);
        const getHeroByName = await prisma.superhero.findFirst({
            where: {
                nom: {
                    contains: name.nom
                }
            },
            include: {
                incidents: true,
                interventions: true,
            },
        })
        res.status(200).json({Hero : getHeroByName})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllHeros,
    getHeroByName
}