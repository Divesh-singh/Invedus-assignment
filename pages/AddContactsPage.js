import { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddContactForm from '../components/AddContactForm'



function AddContactsPage(){

    const [contacts, setContacts] = useState([])

    const submitHandler = (newContactInfo) =>{
        const contactInfo = {
            ...newContactInfo, id: Math.random().toString()
        };

        setContacts([...contacts, contactInfo]);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }


    useEffect(() => {
        const oldContactList = JSON.parse(localStorage.getItem('contacts'));
        if (oldContactList) {
        setContacts(oldContactList);
        }
    }, []);



    return (
        <div>
            <Header/>
            <div className='container block ml-auto mr-auto p-10  sm:w-3/4 lg:w-1/2  '>
            <AddContactForm onSaveContactData={submitHandler} />
            </div>

        </div>
    )
}
export default AddContactsPage