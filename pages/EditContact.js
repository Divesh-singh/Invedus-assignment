import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase/initFirebase.js'
import {v4} from 'uuid' 


const EditContactPage = () => {
    const router = useRouter();
    const [contacts, setContacts] = useState([]);
    const [id, setId] = useState('')
    const [contactName, setName] = useState('')
    const [contactPhone, setPhone] = useState('')
    const [contactType, setType] = useState('')
    const [contactIsWhatsApp, setIsWhatsApp] = useState(false)
    const [contactImageUpload, setImageUpload] = useState(null)
    const [contactImageLink, setContactImageLink] = useState('')

    useEffect(() => {
        setContacts(JSON.parse(localStorage.getItem("contacts")) || [])
        const contact = JSON.parse(router.query.contact)
        setId(contact.id)
        setName(contact.name)
        setPhone(contact.phone)
        setType(contact.type)
        setIsWhatsApp(contact.isWhatsApp)
        setContactImageLink(contact.photo)

    }, [router.query]);

    const updateContacts = (key, value, newData) => {
        const foundIndex = contacts.findIndex(item => item[key] === value);
        if (foundIndex !== -1) {
            const updatedItem = { ...contacts[foundIndex], ...newData };
            const updatedItems = [...contacts];
            updatedItems[foundIndex] = updatedItem;
            setContacts(updatedItems);
            localStorage.setItem("contacts", JSON.stringify(updatedItems));
        }
    }

    const handelSubmit = () => {
    // Send the updated contact data back to the previous page
    if (contactImageUpload == null){
        updateContacts("id", id, {
            id: id,
            name: contactName,
            phone: contactPhone,
            type: contactType,
            isWhatsApp: contactIsWhatsApp,
            photo: contactImageLink,
        })
        router.push('/');
    }else{
        const imageRef = ref(storage, `contacts/${contactImageUpload.name + v4()}`);
        uploadBytes(imageRef, contactImageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
    
            updateContacts("id", id, {
                id: id,
                name: contactName,
                phone: contactPhone,
                type: contactType,
                isWhatsApp: contactIsWhatsApp,
                photo: url,
            })
            setContactImageLink((prev) => url);
        });
        });
        router.push('/');
    }
    }

    return (
        <div className="min-w-fit">
            <div className='min-w-fit'>
            <Header/>
            <div className='container block ml-auto mr-auto p-10 w-full sm:w-3/4 lg:w-1/2  '>
            <div className="md:container px-10 "style={{"backgroundColor": "#f5f0f0", "color":"black"}} >
                <h1 className='text-2xl font-bold'>Edit Contact Form</h1>
            <form className=''>
                <label className="block py-5">
                    <span className="block font-bold text-slate-700 text-lg"> Name</span>
                    <input type="text" value={contactName} onChange={(event)=>setName(event.target.value)} placeholder="Name here" className="mt-1 w-full px-3 py-2 text-lg bg-white border border-slate-300
                    rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </label>
                <label className="block py-5">
                    <span className="block font-bold text-slate-700 text-lg"> Phone</span>
                    <input type="text" value={contactPhone} placeholder="Phone Number" onChange={(event)=>setPhone(event.target.value)} className="mt-1 w-full px-3 py-2 text-lg bg-white border border-slate-300
                    rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </label>
                <label className="block py-5">
                    <span className="block font-bold text-slate-700 text-lg">Contact Type</span>
                    <select value={contactType} onChange={(event)=>setType(event.target.value)}>
                        <option value="Personal">Personal</option>
                        <option value="Office">Office</option>
                    </select>
                </label>
                <label className="inlin py-5e">
                    <span className="inline-block font-bold text-slate-700 text-lg"> WhatsApp</span>
                    <input type="checkbox" name='Whatsapp' checked ={contactIsWhatsApp} onChange={(event)=> setIsWhatsApp(!contactIsWhatsApp)} className="mx-2" />
                </label>
                <label className="block py-5">
                    <span className="inline-block font-bold text-slate-700 text-lg">Change Photo</span><br/>
                    <input type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}}  className="mx-2" />
                </label>
                <button onClick={handelSubmit} type="button" className="border-2 m-3 p-2 rounded-2xl">Submit</button>
            </form>
        </div>
            </div>
            </div>

        </div>
    )
}
export default EditContactPage