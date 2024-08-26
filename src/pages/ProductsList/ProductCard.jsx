import React from 'react'
import img1 from '../../assets/imgCarousel_1.jpg'
import img2 from '../../assets/imgCarousel_2.jpg'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({props}) => {
    // style img
    const style = {
        transition: 'transform 0.7s',
    }

    // navigate
    const navigate = useNavigate()

    // component
    return (
        <div className={`
        flex flex-col w-full aspect-[3/4]
        mx-auto cursor-pointer
        `}
        onClick={()=>{navigate(`/produits/${props.id}`)}}
        >
            {/* border-solid border-2 border-slate-200 bg-red-20 */}
            {/* img */}
            <div className={`h-[80%] truncate`}>
                <img style={style} className={`
                h-full w-full object-cover
                hover:scale-125
                `} src={props.img} alt="" />
            </div>

            {/* text */}
            <div className={`pt-[10px] h-[105px] lg:h-[110px] flex flex-col justify-between`}>
                <div>
                    <p className={`text-[15px] font-normal text-slate-500
                m-0 lg:text-[16px]
                `}>{props.category}</p>
                    <p className={`m-0 text-[17px] leading-[22px]
                    lg:text-[18px]
                    `}>{props.title}</p>
                </div>
                <b className={`m-0 text-[18px]
                lg:text-[18px]
                `}>{props.price} DA</b>
            </div>
        </div>
    )
}

export default ProductCard