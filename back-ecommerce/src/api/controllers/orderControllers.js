import { Order, OrderProduct, Product } from "../../prisma/prisma.js";
import { getContent } from "../../utils/mail.js"
import transporter from "../../config/transporter.js"

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        // Get all orders with their related order products
        const orders = await Order.findMany({
            include: {
                orderProducts: true,
            }
        });

        // Send data
        res.status(200).json(orders);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue");
    }
};

// Get single order by ID
const getOrder = async (req, res) => {
    try {
        // Get order ID from params
        const id = parseInt(req.params.id);

        // Get order by ID with related order products
        const order = await Order.findUnique({
            where: { id },
            include: {
                orderProducts: true,
            }
        });

        if (!order) {
            return res.status(404).send("Aucune commande ne correspond à cet ID");
        }

        // Return order data
        res.status(200).json(order);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue");
    }
};

// Add new order
const addOrder = async (req, res) => {
    const { name, phone, address, products } = req.body;

    try {
        // Create new order
        const order = await Order.create({
            data: {
                name,
                phone,
                address,
            }
        });

        // Add products to the order
        await Promise.all(
            products.map(async (product) => {
                // Get the product's price
                const productData = await Product.findUnique({
                    where: { id: product.id },
                });

                if (!productData) {
                    throw new Error(`Produit avec ID ${product.id} non trouvé`);
                }

                // Create OrderProduct with the price of the product
                await OrderProduct.create({
                    data: {
                        orderId: order.id,
                        productId: product.id,
                        quantity: product.quantity,
                        price: productData.price,
                    }
                });
            })
        );

        // get the order with all info included
        const newOrder = await Order.findUnique({
            where: {id: order.id},
            include: {
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
            }
        })

        // send mail
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.FROM_EMAIL,
            subject: `Commande #${order.id}`,
            // html: ,
            text: getContent(newOrder),
        };
        
        try {
            const info = await transporter.sendMail(mailOptions);
            res.status(201).send("Commande envoyée");
        }
        catch (error) {
            console.log({ error: 'Erreur lors de l\'envoi de l\'e-mail.', details: error.message })
            return res.status(400).json({ error: 'Erreur lors de l\'envoi de l\'e-mail.', details: error.message })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("Une erreur est survenue");
    }
};


export { getAllOrders, getOrder, addOrder };
