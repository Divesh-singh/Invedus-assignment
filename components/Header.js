import Link from 'next/link'

function Header(){
    return(
        <header className=" pt-6 pb-1 md:py-6" style={{"backgroundColor": "grey", "color":"white"}}>
            <div className="container md:flex md:items-center md:justify-between mx-auto px-4">
            <Link href='/'><h1 className="text-5xl font-bold mb-4 md:mb-0 select-none" >Contacts</h1></Link>
            <ul className="md:flex md:items-center list-none text-lg ">
                <li className="md:ml-4">
                    <Link href='/' className="block md:inline border-2 my-4 md:my-0 p-2 md:p-1.5 rounded-2xl md:hover:animate-pulse ">
                    Home
                    </Link>
                </li>
                <li className="md:ml-4">
                <Link href='/AddContactsPage' className="block md:inline border-2 my-4 md:my-0 p-2 md:p-1.5 rounded-2xl md:hover:animate-pulse ">
                    Add Contacts
                </Link>
                </li>
            </ul>
            </div>
        </header>
    )
}

export default Header