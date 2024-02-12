import React from 'react'
import useContacts from '../../hooks/useContacts'
import LoadingIndicator from '../LoadingIndicator'
import { List, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import ContactItem from './ContactItem'
import { IContacts } from '../../Types'
import { useRouter } from 'expo-router'

const ContactFeed = () => {
    let contacts = useContacts()
    const { colors } = useTheme()
    const router = useRouter()

    const goToChat = (contact: IContacts) => {
        router.replace({
            pathname: '/Chat/',
            params: {
                id: contact.id,
                name: contact.name,
                phone: contact.phoneNumber,
                avatarImg: contact.avatarImg
            }
        })
    }

    if (!(contacts?.length > 0 && contacts)) return <LoadingIndicator />
    return (
        <ScrollView>
            <List.Section>
                <List.Subheader>Contact on FastChat</List.Subheader>
                {(contacts?.length > 0 && contacts) ? (
                    contacts
                        .filter(c => c.isOnFastChat)
                        .map((contact, idx) => (<ContactItem
                            key={contact.phoneNumber + contact.id +idx}
                            contact={contact}
                            onPress={() => goToChat(contact)} />)
                        )) : null}
            </List.Section>
            <List.Section>
                <List.Subheader>Invite a friend</List.Subheader>
                {(contacts?.length > 0 && contacts) ? (
                    contacts
                        .filter(c => !c.isOnFastChat)
                        .map((contact, idx) => <ContactItem
                        key={contact.phoneNumber + contact.id +idx}
                            contact={contact}
                            right={() => (
                                <TouchableRipple style={{
                                    alignSelf: 'center',
                                    padding: 5,
                                    marginRight: 10,
                                    borderRadius: 10
                                }}
                                    rippleColor={colors.notification}
                                    onPress={() => console.log("pressed")}>
                                    <Text
                                        style={{
                                            color: colors.notification,
                                            fontSize: 16,
                                        }}>Invite</Text>
                                </TouchableRipple>
                            )} />)
                ) : null}
            </List.Section>
        </ScrollView>
    )
}

export default ContactFeed