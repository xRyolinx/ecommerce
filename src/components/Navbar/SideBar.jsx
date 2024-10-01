import React, { useState } from 'react'
import NavElement from './NavElement'
import { IoMdClose } from 'react-icons/io'
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useNavToggle } from "../../state/navToggle";


const SideBar = ({ links }) => {
    // context of state
    const { toggle, handleToggle } = useNavToggle()

    // query
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const search = () => {
        navigate(`/produits?q=${query}`)
        setQuery('')
        handleToggle()
        document.activeElement.blur()
    }

    // style
    const style = {
        transition: 'width 0.3s, padding 0.3s',
    }

    // class
    const width = toggle ? 'w-[300px]' : 'w-0'
    const px = toggle ? 'px-10' : 'px-0'
    const grayDisplay = toggle ? 'block' : 'hidden'


    // component
    return (
        <>
            {/* side bar component */}
            <div style={style} className={`lg:hidden
            absolute ${width} h-[100vh] top-0 left-0
            py-4 bg-mainn z-[800] truncate`
            }>
                {/* closing container */}
                <div className={`bg-geen-300 pl-6 flex items-center justify-start`}>
                    <IoMdClose onClick={handleToggle}
                        className={`block cursor-pointer
                        text-[25px] text-white`}
                    />
                </div>

                {/* side bar elements container */}
                <div style={style} className={` bg-ed-300
                flex flex-col justify-between items-center
                w-full h-full max-h-[450px] ${px}`
                }>
                    {/* query */}
                    <div className={`w-full flex justify-between items-center
                    border-solid border-y-2 border-l-2 border-slate-200 bg-red-20
                    mt-[30px] mb-[20px] bg-blac
                    `}>

                        {/* input query */}
                        <input value={query} type="text" className={`
                        bg-transparent text-white placeholder-slate-100 font-semibold
                        w-full flex-grow px-2 py-2
                        `}
                            placeholder='Recherche'
                            onChange={(e) => { setQuery(e.target.value) }}
                            onKeyUp={(e) => {
                                e.preventDefault()
                                if (e.key == 'Enter') {
                                    search()
                                }
                            }}
                            enterKeyHint='done'
                        />

                        {/* icon search */}
                        <IoIosSearch className={`text-white text-2xl cursor-pointer`}
                            onClick={search}
                        />

                    </div>

                    {/* navlinks */}
                    {
                        links.map((el, index) => {
                            return <NavElement key={index}
                                link={el.link} content={el.content} />
                        })
                    }
                </div>

            </div>

            {/* grey area */}
            <div onClick={handleToggle} className={`${grayDisplay}
            lg:hidden absolute h-[100vh] w-full
            bg-gray-500 opacity-50 top-0 left-0`}>
            </div>
        </>
    )
}

export default SideBar