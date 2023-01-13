import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase/initFirebase';
import {useState, useEffect} from 'react';

// import {v4} from 'uuid' 

function AddContactForm(props){

    // const storage = getStorage();
    // const storageRef = ref(storage, 'images')
    
    const [contactName, setName] = useState(null)
    const [contactPhone, setPhone] = useState(null)
    const [contactType, setType] = useState('Personal')
    const [contactIsWhatsApp, setIsWhatsApp] = useState(false)
    const [contactImageUpload, setImageUpload] = useState(null)
    const [contactImageLink, setContactImageLink] = useState('')

    

    const uploadFile = () => {
        if (contactImageUpload == null) return;
        const name = new Date().getTime() + contactImageUpload.name
        const imageRef = ref(storage, `images/${name}`);
        uploadBytes(imageRef, contactImageUpload ).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setContactImageLink((prev) => [...prev, url]);
        });
        });
        };

    useEffect(()=>{
        const uploadPhoto =() =>{
            const name = new Date().getTime() + contactImageUpload.name
            const storageRef = ref(storage, `contacts/${name}`)
            console.log(storageRef)

            // const uploadTask = uploadBytesResumable(storageRef, contactImageUpload);
            uploadFile();
            

//             uploadTask.on('state_changed', 
//             (snapshot) => {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//                 }
//             }, 
//             (error) => {
//                 console.log(error)
//                 // Handle unsuccessful uploads
//             }, 
//             () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//                 setContactImageLink(downloadURL)
//                 });
//             }
// );

        }
        contactImageUpload && uploadPhoto()
    },[contactImageUpload])
    

//TODO: Fetch local storage, update locally , set updated contactlist to local storage

    // const updateDB = () =>{
    //     localStorage.setItem('newList', JSON.stringify(contactDetails))
    // }
    
    const handelSubmit = () =>{

        const contactDetails= {
            name: contactName,
            phone: contactPhone,
            type: contactType,
            isWhatsApp: contactIsWhatsApp,
            photo: contactImageUpload
        };
        props.onSaveContactData(contactDetails);
    }

    return(
        <div className="md:container px-10  "style={{"background-color": "#f5f0f0", "color":"black"}} >
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