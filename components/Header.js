import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ href, children }) => {
    const router = useRouter();
    const isActive = router.asPath === href;
    
        return (
        <Link href={href}>
            <a className={`underline-offset-4 ${isActive ? 'underline' : ''}`}>
            {children}
            </a>
        </Link>
        );
    };

function Header(){
    const router = useRouter()
    return(
        <header className="min-w-fit pt-6 pb-1 md:py-6" style={{"backgroundColor": "grey", "color":"white"}}>
            <div className="container md:flex md:items-center md:justify-between mx-auto px-4">
            <Link href='/'><h1 className="text-5xl font-bold mb-4 md:mb-0 select-none" >Contacts</h1></Link>
            <ul className="md:flex md:items-center list-none text-lg ">
                <li className="md:ml-4">
                <NavLink href="/">Home</NavLink>
                    {/* <Link href='/' className="block md:inline  border-2 my-4 md:my-0 p-2 md:p-1.5 rounded-2xl md:hover:animate-pulse ">
                    Home
                    </Link> */}
                </li>
                <li className="md:ml-4">
                <NavLink href="/AddContactsPage">Add Contacts</NavLink>
                {/* <Link href='/AddContactsPage' className="block md:inline border-2 my-4 md:my-0 p-2 md:p-1.5 rounded-2xl md:hover:animate-pulse ">
                    Add Contacts
                </Link> */}
                </li>
            </ul>
            </div>
        </header>
    )
}

export default Header