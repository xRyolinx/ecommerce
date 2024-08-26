import { useState, useEffect, createContext } from "react"
import { NavLink } from "react-router-dom"
import { IoMdMenu } from "react-icons/io";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
import logo from '../../assets/logo.jpg'
import NavCart from "./NavCart";
import { isLarge } from "../../utils/isLarge";
import { useLocation } from "react-router-dom";

export const ToggleContext = createContext()

// liens
const links = [
    {
        link: '/',
        content: 'Accueil',
    },
    {
        link: '/produits',
        content: "Produits",
    },
    {
        link: '/categories',
        content: "Catégories",
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
// liens où nav est transparente
const linkTransparants = [
    '/',
]

const Navbar = () => {
    // toggle
    const [toggle, setToggle] = useState(false)

    // for transparent
    const [transparent, setTransparent] = useState(true)
    const [navTransparent, setNavTransparent] = useState(true)


    // change color when changing page
    const path = useLocation().pathname
    useEffect(() => {
        const pathIncluded = linkTransparants.includes(path)
        setNavTransparent(pathIncluded)
        setTransparent(pathIncluded)
    }, [path])

    // change color while scrolling
    useEffect(() => {
        // is nav transparant ?
        const pathIncluded = linkTransparants.includes(path)
        const handleScroll = () => {
            const navHeight = isLarge() ? 100 : 69
            if (window.scrollY >= (window.innerHeight - navHeight)) {
                setTransparent(false)
            }
            else {
                setTransparent(true)
            }
        }
        // if transparent, add event
        if (pathIncluded) {
            window.addEventListener('scroll', handleScroll)

            return (() => {
                window.removeEventListener('scroll', handleScroll)
            })
        }
    }, [path, transparent, setTransparent])

    // console.log('transparent: ',transparent)
    // console.log('navTransparent: ', navTransparent)
    // style
    const bg = transparent ? 'bg-transparent' : 'bg-mainn'
    const bgNav = navTransparent ? 'bg-transparent' : 'bg-red-200'
    const style = {
        transition: 'background-color 0.4s',
    }

    // some functions
    const handleToggle = () => { setToggle((t) => !t) }

    // component
    return (
        <ToggleContext.Provider value={{ toggle, setToggle, handleToggle }}>
            <nav className={`flex justify-between items-center
            sticky top-0 w-full h-[70px] px-6
            lg:h-[100px] lg:px-12
            z-[700] ${bgNav} `}>
                
                {/* background */}
                <div style={style} className={`h-full w-full absolute top-0 left-0 ${bg} z-[-10]`}></div>

                {/* menu button */}
                <button onClick={handleToggle}
                    className="w-[50px] cursor-pointer border-none
                    lg:hidden"
                >
                    <IoMdMenu color="white"
                        className="text-[25px] lg:text-[30px]"
                    />
                </button>

                {/* nav marque */}
                <div className={`h-[70%] lg:w-[15%] lg:h-[75%]`}>
                    <NavLink className={`no-underline`} to="/">
                        <div className={`hidden lg:block h-full aspect-square p-1 lg:p-2 bg-main rounded-full truncate`}>
                            <img className={`h-full`} src={logo} alt="" />
                        </div>
                        <p className={`flex items-center justify-center h-full
                            text-white text-lg font-nobia italic
                            lg:hidden`}>
                            Chaleurs Artisanales
                        </p>
                    </NavLink>
                </div>

                {/* nav links lg */}
                <NavLinks links={links} />

                {/* cart */}
                <NavCart />

                {/* side bar for mb */}
                <SideBar links={links} />
            </nav>

        </ToggleContext.Provider>
    )
}

export default Navbar