import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useCart } from '../../state/cartStore'

const CartPage = () => {
    // get items
    const { items, deleteItem, editItem } = useCart()

    const handleEditItem = (id: string, quantity: number) => {
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
            quantity = parseInt(quantity.toString().slice(1))
        }
        // max 99
        if (quantity > 99) {
            quantity = 99
        }

        // edit state
        editItem(id, quantity)
    }

    // total
    let sousTotal = 0
    Object.keys(items).forEach(key => {
        const e = items[key]
        sousTotal += e.price * e.quantity
    })
    const livraison = 500
    const total = [
        ['Sous-Total', sousTotal],
        ['Livraison', livraison],
        ['Total', sousTotal + livraison]
    ]

    // inputs
    const inputs = [
        'nom',
        'numero',
        'adresse'
    ]


    // animation of delete
    const animateDeleteCartItem = (id) => {
        const product = document.getElementById(`product${id}`)?.style
        if (!product) return
        product.transition = 'height 0.8s, padding 0.8s'
        product.overflow = 'hidden'
        product.opacity = '0'
        product.height = '0'
        product.padding = '0'
        product.border = 'none'
    }


    // component
    return (
        <main className={`px-[20px] pt-[40px]
            lg:px-[60px]
        `}>
            <h2 className={`mb-[25px]`}>Votre panier</h2>

            {/* section of products */}
            <section className='bg-red-0'>

                {/* product card */}
                {Object.keys(items).length == 0
                    ? (
                        <h5 className={`italic text-slate-500`}>
                            {`Aucun article dans votre panier`}
                        </h5>
                    )
                    : (
                        Object.keys(items).map((id) => {
                            const item = items[id]
                            return (
                            <article id={`product${item.id}`} key={item.id} className={`flex justify-between items-center
                            h-[100px] py-[0.75rem] gap-4
                            border-solid border-y-2 border-slate-100
                            bg-blue-20
                            lg:h-[130px]
                            `}
                                onTransitionEnd={() => deleteItem(item.id)}>

                                {/* infos */}
                                <div className={`flex justify-between items-center
                            h-full flex-grow
                            lg:w-1/2 lg:flex-grow-0
                            `}>

                                    {/* img */}
                                    <div className={`h-[100%] aspect-square
                                lg:h-full lg:aspect-[4/3]
                                `}>
                                        <img className='h-full w-full object-cover' src={item.img} alt="" />
                                    </div>

                                    {/* text */}
                                    <div className={`flex-grow h-full flex flex-col justify-between
                                pl-5
                                `} >
                                        {/* titre et prix */}
                                        <strong className='bg-green-5 text-sm lg:text-base font-bold'>{item.title}</strong>
                                        <b className='bg-violet-10 text-xs lg:text-sm font-semibold'>{item.price} DA</b>
                                        {/* space for lg */}
                                        <b className='hidden lg:block'>&nbsp;</b>
                                    </div>

                                </div>


                                {/* quantity and delete */}
                                <div className={`flex flex-col justify-center items-center
                            h-full gap-3 bg-red-20
                            lg:flex-row lg:justify-between lg:gap-0 lg:flex-grow
                            `}>
                                    {/* space for pc */}
                                    <div className={`hidden bg-blue-50 h-[40px]
                                    lg:block
                                `} />

                                    {/* quantity */}
                                    <input type="text" placeholder='0' value={item.quantity} className={`
                                w-[40px] px-2 text-center
                                border-solid border-2 border-slate-100
                                lg:text-start lg:w-[60px]
                                `}
                                        onChange={(e) => { handleEditItem(item.id, parseInt(e.target.value)) }}
                                    />

                                    {/* delete */}
                                    <FaRegTrashAlt onClick={(e) => animateDeleteCartItem(item.id)} className={`
                                    text-lg text-gray-500 cursor-pointer
                                    lg:text-xl
                                `} />
                                </div>
                            </article>
                        )})
                    )
                }

            </section>
            
            {/* form and total */}
            <section className={`justify-between items-center
                w-full mt-[60px]
                lg:flex lg:mt-[80px] lg:items-start
            `}>
                {/* form */}
                <div className='w-full mb-[50px] lg:w-1/2 lg:mb-[2rem]'>
                    <h2 className='mb-4'>Entrez vos informations</h2>
                    {
                        inputs.map((i, index) => (
                            <div key={index} className='my-3'>
                                <b className=''>{i[0].toUpperCase() + i.slice(1)}</b>
                                <input type="text" className={`
                                w-full px-2 py-2 text-start mt-2
                                border-solid border-2 border-slate-100
                                `} placeholder={i[0].toUpperCase() + i.slice(1)} />
                            </div>
                        ))
                    }
                </div>

                {/* total container */}
                <div className='h-full w-full lg:w-1/3 pb-[10px]'>
                    <h2>Prix total</h2>
                    <div className='bg-gray-30 py-2'>
                        {/* prix et livraison */}
                        {
                            total.map((e, i) => (
                                <div key={i} className={`flex justify-between items-center
                                border-solid border-b-[1px] border-slate-100
                                py-2 mb-2 ${e[0] == 'Total' ? 'pt-4 font-bold' : ''}
                                `}>
                                    <p className='m-0'>{e[0]}</p>
                                    <p className='m-0'>{e[1]} DA</p>
                                </div>
                            ))
                        }
                    </div>

                    {/* button */}
                    <div className={`w-full max-w-[160px] mx-auto py-[20px]
                    `}>
                        <button className={`w-full py-[14px] rounded-md
                        ${Object.keys(items).length > 0 ? 'bg-black' : 'bg-gray-400'}
                        text-white
                        `}
                            disabled={Object.keys(items).length == 0}
                        >
                            Commander
                        </button>
                    </div>
                </div>
            </section>
            
        </main>
    )
}

export default CartPage