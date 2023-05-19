const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllIncidents = async (req, res) => {
    try {
        const allIncidents = await prisma.incident.findMany();
        res.status(200).json({
            incidents: allIncidents
        })
    } catch (error) {
        console.log(error);
    }
}
 



module.exports = {
    getAllIncidents
}