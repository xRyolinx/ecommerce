import { Admin, History } from "../../prisma/prisma.js";


// get all history
const getAllHistory = async (req, res) => {
    try {
        // get
        const history = await History.findMany()

        // send data
        res.status(200).json(history)
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue")
    }
}

const addToHistory = async (adminId, description) => {
    try {
        // add action to history
        await History.create({
            data: {
                adminId,
                description
            }
        })

        console.log("Added to history")
    }
    catch (e) {
        console.log("Erreur durant la sauvegarde de l'historique")
        console.log(e)
    }
}

export { addToHistory, getAllHistory }