import React from 'react'
import { useEffect } from 'react'
import products from '../../../products.json'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NotFoundPage from '../NotFound/NotFoundPage'
import { useCart } from '../../state/cartStore'
import { getProduct } from '../../api/fetchProduct'
import Spinner from '../../components/Spinner'

const ProductPage = () => {
    // navigation
    const navigate = useNavigate()

    // get fn add to cart
    const { addItem } = useCart()

    // get id
    const { id } = useParams()

    // get product
    const { data, isLoading, isError } = getProduct(id)
    const product = data

    // white fetching
    if (isLoading)
        return <Spinner loading={isLoading} />
    
    // if error occured
    if (isError)
        return <NotFoundPage/>
    
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
            onClick={()=>{addItem(product)}}
            >
                Ajouter au Panier
            </button>
        </main>
    )
}

export default ProductPage