import React, { useEffect, useState } from 'react'
import ContactLayout from './ContactLayout'
import Header from '../../components/Header'
import * as Contacts from 'expo-contacts'

const Main = () => {
  const [contacts, setContacts] = useState<string[]>()
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });
          let _contacts: string[]
          if (data.length > 0) {
            for (let contact of data) {
              _contacts.push(`Name: ${contact.name}, Phone:${contact.phoneNumbers}`);
            }
          }
          setContacts(_contacts)
        }
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);
  return (
    <ContactLayout>
      <Header title='Contacts' />
    </ContactLayout>
  )
}

export default Main