import { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddContactForm from '../components/AddContactForm'
import { useRouter } from "next/router";
import {v4} from 'uuid'


function AddContactsPage(){

    const [contacts, setContacts] = useState([])
    const router = useRouter();

    const submitHandler = (newContactInfo) =>{
        const contactInfo = {
            ...newContactInfo, id: (newContactInfo.phone + v4()).toString()
        };

        setContacts([...contacts, contactInfo]);
        localStorage.setItem('contacts', JSON.stringify([...contacts, contactInfo]));
    router.push("/");
    }


    useEffect(() => {
        const oldContactList = JSON.parse(localStorage.getItem('contacts'));
        if (oldContactList) {
        setContacts(oldContactList);
        }
    }, []);



    return (
        <div className='min-w-fit'>
            <Header/>
            <div className='min-w-fit container block ml-auto mr-auto p-10  sm:w-3/4 lg:w-1/2  '>
            <AddContactForm onSaveContactData={submitHandler} />
            </div>

        </div>
    )
}
export default AddContactsPage