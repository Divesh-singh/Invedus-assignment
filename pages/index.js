import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ContactCard from '../components/contactCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorMessage from '../components/Error'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {storage} from '../firebase/initFirebase.js'
import {ref, deleteObject} from 'firebase/storage'




export default function Home() {
  
  const [data, setData] = useState([])
  const router = useRouter()

  const deleteContactHandler = (index, name, photo)=>{
    console.log("Going to delete "+ index)
    if (window.confirm(`Are you sure you want to delete contact: ${name} ?`)) {
    // Delete the item from the array
      const newContactList = data.filter((item, i) => i !== index);
      // Delete photo from firebase storage
      const photoRef = ref(storage, photo );
      deleteObject(photoRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });
      // Update the state
      setData(newContactList);
      // Update the local storage
      localStorage.setItem("contacts", JSON.stringify(newContactList));
    }
  }

  const editContactHandler = (id) =>{
    console.log("Go to edit page for " + id)
    router.push(`/EditContact/${id}`)
  
  }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts){
      const sortedContacts = contacts.sort((a,b)=> a.name.localeCompare(b.name));
      if (sortedContacts) {
      setData(sortedContacts);
      }
    }
    
  }, []);

  return (

    <div className={styles.container }>
      <Head>
        <title>Contact App</title>
        <meta name="Contact app" content="Created by Divesh Singh for React JS developer assignment (Invedus) Tech Stack Used:{React JS, Next JS, Firebase for file storage, LocalStorage for saving contact in client browser} " />
        
      </Head>

      <main className={styles.main}>
        <Header/>

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5 pt-20 px-5 w-full">

          {data.length !==0 ? data.map((contact, index)=>(
            <ContactCard 
            onEditContact={editContactHandler}
            onDeleteContact={deleteContactHandler}
            key={index}
            index = {index}
            id = {contact.id}
            name = {contact.name}
            type = {contact.type}
            phone = {contact.phone}
            isWhatsApp = {contact.isWhatsApp}
            photo= {contact.photo}
            />
          )) : <div className='text-xl '><ErrorMessage message="NO CONTACT FOUND"/> <div className=''><Link href='/AddContactsPage' className='border rounded-xl px-2 text-lg'>Add Contacts</Link></div></div>
          }
        </div>
      </main>

      <Footer/>
    </div>
  )
}
