// sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));


// get cart items
const getCartItems = () => {
    const data = { ...localStorage }
    const items = []
    for (const i in data) {
        items.push(JSON.parse(data[i]))
    }

    return items
}

// add cart item
const addCartItem = (product, setNbPanier) => {
    const products = getCartItems()
    const data = products.find((e) => e.id == product.id)

    // check if exist
    const item = !data
        // create new item
        ? {
            ...product,
            quantity: 1,
        }
        // exist in local storage
        : {
            ...data,
            quantity: data.quantity + 1,
        }


    // store in local
    localStorage.setItem(product.id, JSON.stringify(item))


    // increment nb panier
    setNbPanier((nb) => nb + 1)
}


// delete item from local storage
const deleteCartItem = (id, setItems) => {
    localStorage.removeItem(id)
    setItems((items) => {
        return items.filter(i => i.id != id)
    })

}

// edit quantity
const editCartItem = async (id, quantity, setItems) => {
    // test inputted quantity
    if (isNaN(quantity) && quantity) {
        return
    }

    // deleting quantity
    if (!quantity) {
        quantity = 0
    }

    // if start with 0
    if (quantity[0] == '0') {
        quantity = quantity.slice(1)
    }

    // max 99
    if (quantity > 99) {
        quantity = '99'
    }

    // set state
    setItems((items) => {
        // get item and its index
        const item = items.filter((i) => i.id == id)?.[0]
        const index = items.indexOf(item)

        // set quantity
        item.quantity = quantity

        // set to local storage and nb panier
        localStorage.setItem(id, JSON.stringify(item))
        return [...items.slice(0, index), item, ...items.slice(index + 1)]
    })
}

const getQuantity = (items) => {
    let q = 0
    for (const i in items) {
        const item = items[i]
        q += parseInt(item.quantity)
    }
    return q
}

export { getCartItems, addCartItem, deleteCartItem, editCartItem, getQuantity }