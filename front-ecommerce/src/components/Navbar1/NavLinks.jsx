import React from 'react'
import NavElement from './NavElement'
import { useState, useEffect } from 'react'

const NavLinks = ({links, toggle, setToggle }) => {

    const navAddStyle = {
        transition: 'margin 0.6s',
    }

    const basicClass = `flex flex-col justify-between items-center
            w-full h-auto absolute pl-5 pt-2 pb-3 mt-[-300px] z-[800]
            bg-blue-500 border-solid border-t-[1px] border-t-slate-400
            lg:flex-row lg:w-[60%] lg:mt-0 lg:py-0 lg:border-none lg:relative`
    const navLinksClass = toggle
        ? basicClass + ' mt-[0]'
        : basicClass


    return (
        <div style={navAddStyle} className={navLinksClass} id="nav_add">
            {
                links.map((el, index) => {
                    return <NavElement key={index} setToggle={setToggle}
                    link={el.link} content={el.content}/>
                })
            }
        </div>
    )
}

export default NavLinks