import React from 'react'
import { NavLink } from 'react-router-dom'

const NavElement = ({ link, content, setToggle }) => {
    // style
    const navElementStyle = {
        transition: 'border 0.3s',
    }

    // class
    const navElementClass = `text-sm font-medium no-underline font-sans
    text-blue-100 py-3 px-1 border-b-2 border-transparent my-2
    lg:py-[6px] lg:border-solid lg:my-0
    hover:border-white hover:text-white`
    const getNavElementClass = ({ isActive }) =>
        isActive
            ? navElementClass + ' border-white text-white'
            : navElementClass

    return (
        <>
            <NavLink onClick={()=>{setToggle(false)}}
            style={navElementStyle} className={getNavElementClass} to={link}>{content}</NavLink>
        </>
    )
}

export default NavElement