import React from 'react'
import ProductCard from './ProductCard'
// import products from '../../../products.json'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts } from '../../api/fetchProduct'
import NotFoundPage from '../NotFound/NotFoundPage'
import Spinner from '../../components/Spinner'


const ProductsListPage = () => {
    // parameters
    const [params, setParams] = useSearchParams()
    const query = params.get('q')
    const title = query ? `Resultats de : ${query}` : 'Nos produits'

    // get products
    const { data, isLoading, isError } = getAllProducts(query)
    const products = data

    // if error occured
    if (isError)
        return <NotFoundPage/>

    // component
    return (
        <main className='max-w-[1250px] mx-auto px-[20px] py-[40px]
        lg:px-[40px]'>
            <h2 className={`text-center mb-[30px] font-bold`}>{title}</h2>

            {/* while fetching */}
            {isLoading ? <Spinner loading={isLoading} /> : (
                products.length == 0
                ? (
                    <h4 className={`italic text-slate-500 text-center`}>
                        Aucun produit ne correspond à votre recherche
                    </h4>
                )
                : (   
                    <div className={`grid gap-y-[3rem] gap-x-[1rem]
                    justify-center
                    grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                    lg:gap-x-[1.5rem] lg:gap-y-[3.5rem] 
                    `}>
                        {
                            products.map((e)=>(
                                <ProductCard props={e} key={e.id} />
                            ))
                        }

                    </div>
                )
            )}
        </main>
    )
}

export default ProductsListPage