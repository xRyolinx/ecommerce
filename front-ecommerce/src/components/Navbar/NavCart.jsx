import { useNavigate } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../../state/cartStore'

const NavCart = () => {
    // navigate
    const navigate = useNavigate()
    const goToPanier = () => navigate('/panier')
    
    // nb panier
    const { nb } = useCart()
    console.log(nb)
    
    // component
    return (
        <div className={`h-full flex flex-row justify-end items-center
        w-[50px] lg:w-[15%]`}>

            <div className={`relative w-full pt-2 pr-1`}>
                {/* cart */}
                <IoCartOutline color="white" className={`
            ml-auto text-[30px] cursor-pointer
            lg:text-[40px]`}
                    onClick={goToPanier}
                />

                {/* circle */}
                <div className={`absolute top-0 right-0
            flex items-center justify-center cursor-pointer
            w-[20px] aspect-square rounded-full p-[2px]
            text-center text-[12px] bg-red-600 text-white`}
                    onClick={goToPanier}
                >
                    {nb > 99 ? 99 : nb}
                </div>
            </div>
        </div>
    )
}

export default NavCart