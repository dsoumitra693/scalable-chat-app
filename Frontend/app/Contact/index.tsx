import React from 'react'
import ContactLayout from './ContactLayout'
import Header from '../../components/Header'
import { ContactFeed } from '../../components/Contacts'

const Main = () => {
  
  return (
    <ContactLayout>
      <Header title='Contacts' />
      <ContactFeed/>
    </ContactLayout>
  )
}

export default Main