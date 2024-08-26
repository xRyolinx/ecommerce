import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ToggleContext } from './Navbar'

const NavElement = ({ link, content }) => {
    // style
    const navElementStyle = {
        transition: 'border 0.3s',
    }

    // class
    const navElementClass = `text-sm font-medium no-underline font-sans
    text-slate-100 py-3 px-1 border-b-2 border-transparent my-2
    lg:py-[6px] lg:border-solid lg:my-0
    hover:border-white hover:text-white`
    const getNavElementClass = ({ isActive }) =>
        isActive
            ? navElementClass + ' border-white text-white'
            : navElementClass

    // get setToggle from context
    const { setToggle } = useContext(ToggleContext)

    // component
    return (
        <NavLink onClick={() => { setToggle(false) }}
            style={navElementStyle} className={getNavElementClass} to={link}>
            {content}
        </NavLink>
    )
}

export default NavElement