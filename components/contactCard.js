// import Image from 'next/image'
import { ImOffice} from 'react-icons/im';
import { BsFillTelephoneFill, BsFillPersonFill} from 'react-icons/bs';
import { IoLogoWhatsapp} from 'react-icons/io';
import {MdDelete, MdModeEdit} from 'react-icons/md'
import { useState } from 'react';
import { useRouter } from 'next/router';



function ContactCard(props){

    const router = useRouter();

    const [contact, setContact] = useState({
        index : props.index,
        id : props.id,
        name : props.name,
        type : props.type,
        phone : props.phone,
        isWhatsApp : props.isWhatsApp,
        photo: props.photo
    })

    const handleEdit=()=>{
        router.push({
            pathname: '/EditContact',
            query: { contact: JSON.stringify(contact) }
        });
        // props.onEditContact(props.id,props.index, props.name, props.phone, )
    }

    const handleDelete=()=>{
        props.onDeleteContact(props.index, props.name, props.photo)
    }


    return(
        
        <div id="contact-card" style={{"borderColor": "#282828"}} className="relative grid grid-cols-2 grid-row-1 gap-x-1 items-start p-4 mb-3  rounded-xl bg-card-bg border-solid border border-balck text-card-text ">
            <div className='edit-delete-icons absolute flex m-3 gap-1 top-0 right-0'>
                <button onClick={handleEdit} className='md:hover:animate-pulse'>
                    <MdModeEdit className='text-2xl'/>
                    </button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleDelete} className='md:hover:animate-pulse'>
                    <MdDelete className='text-2xl'/>
                    </button>
            </div>
            <div className=" ">
                <div className='justify-center flex block ml-auto mr-auto'>
                    {/* <Image className="h-40 w-40 rounded-full" src={props.photo} alt="profile pic" /> */}
                    <img className="h-40 w-40 rounded-full" src={props.photo} alt="profile pic"/>
                </div>
                <div className="justify-center flex">
                    <h3 className="justify-self-center font-semibold text-xl subpixel-antialiased">{props.name}</h3>
                </div>

            </div>
            <div className="place-self-center">
                <div className='flex '><div className='block mt-auto mb-auto'> {props['type'] ==='Personal' ? <BsFillPersonFill/>:<ImOffice/>} </div><h2 className=" pl-2  font-semibold text-lg  subpixel-antialiased"> {props.type} </h2> </div>
                <div className='flex '><div className='block mt-auto mb-auto'><BsFillTelephoneFill /></div> <h2 className=" pl-2 font-semibold text-lg  subpixel-antialiased">{props.phone} </h2></div>
                <div className='flex '><div className='block mt-auto mb-auto'><IoLogoWhatsapp /></div>{props.isWhatsApp ? <h2 className=" pl-2 font-semibold text-lg  subpixel-antialiased"> Avaliable </h2>:<h2 className=" pl-2 font-semibold text-lg  subpixel-antialiased"> Unavailable </h2>}</div>
                
            </div>
        </div>
    )
}

export default ContactCard