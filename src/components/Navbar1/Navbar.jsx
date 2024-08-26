import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { IoMdMenu } from "react-icons/io";
import NavLinks from "./NavLinks";
import { getLarge } from "../../utils/getLarge";

const Navbar = () => {
    // liens
    const links = [
        {
            link: '/',
            content: 'Accueil',
        },
        {
            link: '/offres',
            content: "Offres d'emplois",
        },
        {
            link: '/about',
            content: 'À propos',
        },
        {
            link: '/contact',
            content: 'Contact',
        },
    ]

    // states
    const [toggle, setToggle] = useState(false)
    const [large, setLarge] = useState(true)
    
    // set up
    useEffect(() => {
        const handleResize = () => {
            if (large != getLarge()) {
                setLarge(getLarge())
            }
        }
        setLarge(getLarge())
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [large])

    return (
        <>
            <nav className="relative h-[70px] min-h-[45px] px-8 lg:px-12 bg-blue-500 w-full
                flex justify-between items-center z-[900]">
                {/* nav marque */}
                <div id="nav_marque">
                    <NavLink style={{color: 'white'}} to="/">
                        Nav marque
                    </NavLink>
                </div>

                {/* menu button */}
                <button onClick={() => {setToggle((t) => !t)}} className="cursor-pointer border-none lg:hidden"
                    id="nav_button">
                    <IoMdMenu color="white" size={'25px'} />
                </button>

                {/* nav links lg */}
                {(large) &&
                    <NavLinks links={links} toggle={toggle} setToggle={setToggle} />
                }
            </nav>

            {/* nav links mb */}
            {(!large) &&
                <NavLinks links={links} toggle={toggle} setToggle={setToggle} />
            }
        </>
    )
}

export default Navbar