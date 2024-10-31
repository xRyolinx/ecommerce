import { Category } from "../../prisma/prisma.js";
import { addToHistory } from "./historyController.js";


// get all categories
const getAllCategories = async (req, res) => {
    try {
        // get
        const categories = await Category.findMany({
            include: {
                products: true,
            }
        })

        // send data
        res.status(200).json(categories)
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue")
    }
}


// get category
const getCategory = async (req, res) => {
    try {
        // get id
        const id = req.params.id;
        
        // get category
        const category = await Category.findUnique({
            where: {id},
            include: {
                products: true,
            }
        })
        if (!category) {
            return res.status(404).send("Aucune catégorie ne correspond à cet ID")
        }

        // return data
        res.status(200).json(category)
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue")
    }
}


// add new category
const addCategory = async (req, res) => {
    // get data
    const userId = req.userId;
    const { name } = req.body;
    const img = req.file.path;

    try {
        // create category
        const category = await Category.create({
            data: {
                name,
                img,
            }
        })

        // add history
        await addToHistory(userId, `Catégorie (${category.name} #${category.id}) ajoutée avec succes`)

        // return
        return res.status(201).send("Catégorie ajoutée avec succes")
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue. Vérifiez que tous les champs sont pleins")
    }
}


// delete category
const deleteCategory = async (req, res) => {
    try {
        // get data
        const userId = req.userId;
        const id = req.params.id;
        
        // get category
        const category = await Category.findUnique({
            where: {id}
        })
        if (!category) {
            return res.status(404).send("Aucune catégorie ne correspond à cet ID")
        }

        // delete
        await Category.delete({
            where: {id}
        })

        // add history
        await addToHistory(userId, `Catégorie (${category.name} #${category.id}) supprimée avec succes`)

        // return
        return res.status(200).send("Catégorie supprimée avec succes")
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue")
    }
}


export { getAllCategories, getCategory, addCategory, deleteCategory }