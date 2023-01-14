import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {useState, useEffect} from 'react';
import {storage} from '../firebase/initFirebase.js'
import {v4} from 'uuid' 

function AddContactForm(props){

    
    const [contactName, setName] = useState(null)
    const [contactPhone, setPhone] = useState(null)
    const [contactType, setType] = useState('Personal')
    const [contactIsWhatsApp, setIsWhatsApp] = useState(false)
    const [contactImageUpload, setImageUpload] = useState(null)
    const [contactImageLink, setContactImageLink] = useState('')

    
    
    const handelSubmit = () =>{
        if (contactImageUpload == null) return;
        const imageRef = ref(storage, `contacts/${contactImageUpload.name + v4()}`);
        uploadBytes(imageRef, contactImageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
    
            const contactDetails= {
                name: contactName,
                phone: contactPhone,
                type: contactType,
                isWhatsApp: contactIsWhatsApp,
                photo: url,
            };
            console.log(contactDetails)
            props.onSaveContactData(contactDetails);
            setContactImageLink((prev) => url);
        });
        });
        
    }

    return(
        <div className="md:container px-10  "style={{"background-color": "#f5f0f0", "color":"black"}} >
            <h1 className='text-2xl font-bold'>Add New Contact </h1>
            <form >
                <label className="block py-5">
                    <span className="block font-bold text-slate-700 text-lg"> Name</span>
                    <input type="text"  onChange={(event)=>setName(event.target.value)} placeholder="Name here" className="mt-1 w-full px-3 py-2 text-lg bg-white border border-slate-300
                    rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </label>
                <label className="block py-5">
                    <span className="block font-bold text-slate-700 text-lg"> Phone</span>
                    <input type="text" placeholder="Phone Number" onChange={(event)=>setPhone(event.target.value)} className="mt-1 w-full px-3 py-2 text-lg bg-white border border-slate-300
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
                    <span className="inline-block font-bold text-slate-700 text-lg">Upload Photo</span>
                    <input type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}}  className="mx-2" />
                </label>
                <button onClick={handelSubmit} type="button" className="border-2 m-3 p-2 rounded-2xl">Submit</button>
            </form>

        </div>
    )


}

export default AddContactForm