import React from 'react'
import { useEffect } from 'react'
import products from '../ProductsList/products.json'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NotFoundPage from '../NotFound/NotFoundPage'
import { addCartItem } from '../Cart/cartUtils'

import { useContext } from 'react'
import { GlobalContext } from '../../App'

const ProductPage = () => {
    // navigation
    const navigate = useNavigate()

    // get context
    const {setNbPanier} = useContext(GlobalContext)

    // get id
    const { id } = useParams()

    // get product
    const data = products['products'].filter((e) => e.id == id)
    if (!data) {
        return <NotFoundPage />
    }
    const product = data[0]


    // component
    return (
        <main className='flex flex-col justify-center items-center mt-5'>
            <h5>{product.category}</h5>
            <h3>{product.title}</h3>
            <h3>{product.price}</h3>
            <img className='w-[200px]' src={product.img} alt="" />

            <button className={`
            bg-slate-500 px-4 py-2 mt-4 text-white rounded-md
            `}
            onClick={()=>{addCartItem(product, setNbPanier)}}
            >
                Ajouter au Panier
            </button>
        </main>
    )
}

export default ProductPage