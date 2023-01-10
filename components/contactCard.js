// import Image from 'next/image'
import { ImOffice} from 'react-icons/im';
import { BsFillTelephoneFill, BsFillPersonFill} from 'react-icons/bs';
import { IoLogoWhatsapp} from 'react-icons/io';
import { useState } from 'react';

function ContactCard(props){


    const [contact, setContact] = useState(props)

    // TypeChecker= () =>{

    // }


    return(
        <div id="contact-card" style={{"border-color": "#282828"}} className="grid grid-cols-2 grid-row-1 gap-x-1 items-start p-4 mb-3  rounded-xl bg-card-bg border-solid border border-balck text-card-text ">
            <div className=" ">
                <div className='justify-center flex block ml-auto mr-auto'>

                    <img className="h-40 w-40 rounded-full" src={props.photo} alt="divesh"/>
                </div>
                <div className="justify-center flex">
                    <h3 className="justify-self-center font-semibold text-xl subpixel-antialiased">{props.name}</h3>
                </div>
                
            </div>
            <div className="place-self-center">
                <div className='flex '><div className='block mt-auto mb-auto'> {props['type'] ==='Personal' ? <BsFillPersonFill/>:<ImOffice/>} </div><h2 className=" pl-2  font-semibold text-lg  subpixel-antialiased"> {props.type} </h2> </div>
                <div className='flex '><div className='block mt-auto mb-auto'><BsFillTelephoneFill /></div> <h2 className=" pl-2 font-semibold text-lg  subpixel-antialiased">{props.phone} </h2></div>
                <div className='flex '><div className='block mt-auto mb-auto'><IoLogoWhatsapp /></div><h2 className=" pl-2 font-semibold text-lg  subpixel-antialiased"> {props.isWhatsApp}</h2></div>
            </div>
        </div>
    )
}

export default ContactCard