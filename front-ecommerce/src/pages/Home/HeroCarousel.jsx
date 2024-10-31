import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/imgCarousel_1.jpg'
import img2 from '../../assets/imgCarousel_2.jpg'
import img3 from '../../assets/imgCarousel_3.jpg'
import './carousel.css'

const HeroCarousel = () => {
    // carousel elements
    const carousel = [
        {
            img: img1,
            title: 'Bougies Personnalisées',
            caption: 'Offrez des bougies personnalisées pour célébrer le bac, le brevet et bien plus encore !',
        },
        {
            img: img2,
            title: 'Bougies Ramadan',
            caption: 'Préparez-vous à illuminer vos nuits ramadan avec nos bougies!',
        },
        {
            img: img3,
            title: 'Bougies Parfumées',
            caption: 'Ressentez l’élégance et la chaleur avec nos bougies parfumées',
        },
    ]

    // component
    return (
        <div className={`absolute top-0 right-0 w-full bg-black`}>
            <Carousel>
                {
                    carousel.map((el, index) => (
                        <Carousel.Item interval={3000} key={index}>
                            {/* img */}
                            <img src={el.img} alt={el.title}
                                className={`w-full mx-auto h-[100vh] object-cover
                                    lg:w-[100%]`}
                            // h-fullnavmb lg:h-fullnav`}
                            />

                            {/* gradient en bas */}
                            <div className={`absolute bottom-0 right-0
                            w-full h-[220px]
                            from-black to-transparent
                            from-20% to-100% 
                            bg-gradient-to-t
                            lg:h-[145px]
                            lg:from-0%
                            `}></div>

                            {/* cover */}
                            <div className={`absolute bottom-0 right-0 h-full w-full
                            from-black to-gray-700 opacity-30 bg-gradient-to-t 
                            `}></div>

                            {/* text */}
                            <Carousel.Caption>
                                <div>
                                    <h3>{el.title}</h3>
                                    <p>{el.caption}</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default HeroCarousel