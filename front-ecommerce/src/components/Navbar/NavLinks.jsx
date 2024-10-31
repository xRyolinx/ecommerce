import NavElement from './NavElement'

const NavLinks = ({ links }) => {

    // component
    return (
        <div className={`hidden lg:flex flex-row justify-between items-center
            w-[60%] h-full px-10 border-none`}
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