import NavElement from './NavElement'

const NavLinks = ({ links }) => {

    // component
    return (
        <div className={`flex flex-row justify-between items-center
            w-[60%] h-full pl-2 border-none`}
        >
            {
                links.map((el, index) => {
                    return <NavElement key={index} link={el.link} content={el.content} />
                })
            }
        </div>
    )
}

export default NavLinks