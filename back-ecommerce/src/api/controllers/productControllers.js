import { Product } from "../../prisma/prisma.js";
import { addToHistory } from "./historyControllers.js";
import { getFile } from "../../utils/file.js"

// get all products
const getAllProducts = async (req, res) => {
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

        // categories
        const categories = req.query.categories
        ? req.query.categories.split(",")?.map(Number)
        : [];
        if (categories && categories.length > 0) {
            cond = {
                ...cond,
                categoryId: {
                    in: categories
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

        // min
        const min = req.query.min_price || null
        if (min) {
            cond = {
                ...cond,
                price: {
                    ...cond.price,
                    gte: Number(min)
                }
            }
        }

        // max
        const max = req.query.max_price || null
        if (max) {
            cond = {
                ...cond,
                price: {
                    ...cond.price,
                    lte: Number(max)
                }
            }
        }

        // get
        const products = await Product.findMany({
            ...cond_global,
            include: {
                category: true
            },
            where: cond
        })

        // send data
        res.status(200).json(products)
    }
    catch (e) {
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


// get product
const getProduct = async (req, res) => {
    try {
        // get id
        const id = parseInt(req.params.id);
        
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
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


// add new product
const addProduct = async (req, res) => {
    // get data
    const userId = req.userId;
    
    const { name, description } = req.body;
    const price = parseInt(req.body.price)
    const categoryId = parseInt(req.body.categoryId) || null

    const img = getFile(req.file)

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
        console.log(e)
        return res.status(400).send("Une erreur est survenue. Vérifiez que tous les champs sont pleins")
    }
}


// delete product
const deleteProduct = async (req, res) => {
    try {
        // get data
        const userId = req.userId;
        const id = parseInt(req.params.id);
        
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
        console.log(e)
        return res.status(400).send("Une erreur est survenue")
    }
}


export { getAllProducts, getProduct, addProduct, deleteProduct }