
const getContent = (order) => {
    const name = order.name
    const phone = order.phone
    const address = order.address
    const products = order.orderProducts.map((p) => {
        return {
            ...p,
            name: p.product.name
        }
    })

    // Buyer info
    let text = `
        Name: ${name}
        Phone: ${phone}
        Address: ${address}

        Commande:
    `
    // Products and total cost
    let total = 500
    for (const product of products) {
        total += product.price * product.quantity
        text += `
            - ${product.name}:
            Unitary price: ${product.price} DA
            Quantity: ${product.quantity}
        `
    }

    // Delivery
    text += `
        Livraison: 500 DA
    `

    // Total cost
    text += `
        Total: ${total} DA
    `
    
    // end
    return text
}

export { getContent }