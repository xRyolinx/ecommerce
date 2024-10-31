import React, { useContext } from 'react'
import NavElement from './NavElement'
import { ToggleContext } from './Navbar'


const SideBar = ({ links }) => {
    // context of state
    const { toggle, setToggle } = useContext(ToggleContext)

    // style
    const navAddStyle = {
        transition: 'width 0.4s, padding 0.3s',
    }

    // class
    const width = toggle ? 'w-[250px]' : 'w-0'
    const px = toggle ? 'px-10' : 'px-0'

    // component
    return (
        <div style={navAddStyle} className={`
        absolute ${width} h-full top-0 left-0
        py-8 bg-blue-500 z-[800] truncate`
        }>
            <div className={`
            flex flex-col justify-between items-center
            w-full h-full max-h-[350px] ${px}`
            }>
                {
                    links.map((el, index) => {
                        return <NavElement key={index} setToggle={setToggle}
                            link={el.link} content={el.content} />
                    })
                }
            </div>
        </div>
    )
}

export default SideBar