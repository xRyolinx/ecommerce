import { Category } from "../../prisma/prisma.js";
import { addToHistory } from "./historyControllers.js";
import { getFile } from "../../utils/file.js";

// get all categories
const getAllCategories = async (req, res) => {
    try {
        // condition
        let cond_global = {}
        let cond = {}
        
        // query
        const q = req.query.q || ""
        if (q) {
            cond = {
                ...cond,
                name: {
                    startsWith: q
                }
            }
        }

        // limit
        const limit = req.query.limit || null
        if (limit) {
            cond_global = {
                ...cond_global,
                take: Number(limit)
            }
        } 

        // get
        const categories = await Category.findMany({
            ...cond_global,
            include: {
                products: true,
            },
            where: cond
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
        const id = parseInt(req.params.id);
        
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
    const { name, description } = req.body;
    const img = getFile(req.file)
        
    try {
        // create category
        const category = await Category.create({
            data: {
                name,
                description,
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
        const id = parseInt(req.params.id);
        
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