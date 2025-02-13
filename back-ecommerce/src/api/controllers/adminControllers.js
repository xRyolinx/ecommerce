import { Admin } from "../../prisma/prisma.js";
import { addToHistory } from "./historyControllers.js";


// get all admins
const getAllAdmins = async (req, res) => {
    try {
        // get
        const admins = await Admin.findMany()

        // send data
        res.status(200).json(admins)
    }
    catch (e) {
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


// get admin
const getAdmin = async (req, res) => {
    try {
        // get id
        const id = parseInt(req.params.id);
        
        // get admin
        const admin = await Admin.findUnique({
            where: {id},
        })
        if (!admin) {
            return res.status(404).send("Aucun admin ne correspond à cet ID")
        }

        // return data
        res.status(200).json(admin)
    }
    catch (e) {
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


// delete admin
const deleteAdmin = async (req, res) => {
    try {
        // get data
        const userId = req.userId;
        const id = parseInt(req.params.id);
        
        // get admin
        const admin = await Admin.findUnique({
            where: {id}
        })
        if (!admin) {
            return res.status(404).send("Aucun admin ne correspond à cet ID")
        }

        // delete
        await Admin.delete({
            where: {id}
        })

        // add history
        await addToHistory(userId, `Admin (${admin.name} #${admin.id}) supprimé avec succes`)

        // return
        return res.status(200).send("Admin supprimé avec succes")
    }
    catch (e) {
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


export { getAllAdmins, getAdmin, deleteAdmin }