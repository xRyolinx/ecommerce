import { Product } from "../../prisma/prisma.js";
import { addToHistory } from "./historyController.js";


// get all products
const getAllProducts = async (req, res) => {
    try {
        // get
        const products = await Product.findMany({
            include: {
                category: true
            }
        })

        // send data
        res.status(200).json(products)
    }
    catch (e) {
        return res.status(400).send("Une erreur est survenue")
    }
}


// get product
const getProduct = async (req, res) => {
    try {
        // get id
        const id = req.params.id;
        
        // get product
        const product = await Product.findUnique({
            where: {id},
            include: {
                category: true,
            }
        })
        if (!product) {
            return res.status(404).send("Aucun produit ne correspond à cet ID")
        }

        // return data
        res.status(200).json(product)
    }
    catch (e) {
        return res.status(400).send("Une erreur est survenue")
    }
}


// add new product
const addProduct = async (req, res) => {
    // get data
    const userId = req.userId;
    const { name, price, description, categoryId} = req.body;
    const img = req.file.path;

    try {
        // create product
        const product = await Product.create({
            data: {
                name,
                price,
                description,
                img,
                categoryId
            }
        })

        // add history
        await addToHistory(userId, `Produit (${product.name} #${product.id}) ajouté avec succes`)

        // return
        return res.status(201).send("Produit ajouté avec succes")
    }
    catch (e) {
        return res.status(400).send("Une erreur est survenue. Vérifiez que tous les champs sont pleins")
    }
}


// delete product
const deleteProduct = async (req, res) => {
    try {
        // get data
        const userId = req.userId;
        const id = req.params.id;
        
        // get product
        const product = await Product.findUnique({
            where: {id}
        })
        if (!product) {
            return res.status(404).send("Aucun produit ne correspond à cet ID")
        }

        // delete
        await Product.delete({
            where: {id}
        })

        // add history
        await addToHistory(userId, `Produit (${product.name} #${product.id}) supprimé avec succes`)

        // return
        return res.status(200).send("Produit supprimé avec succes")
    }
    catch (e) {
        return res.status(400).send("Une erreur est survenue")
    }
}


export { getAllProducts, getProduct, addProduct, deleteProduct }