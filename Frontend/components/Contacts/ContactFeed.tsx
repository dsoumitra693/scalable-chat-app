import React from 'react'
import useContacts from '../../hooks/useContacts'
import LoadingIndicator from '../LoadingIndicator'
import { List, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Avatar from '../Avatar'

const ContactFeed = () => {
    let contacts = useContacts()
    const { colors } = useTheme()

    if (!(contacts?.length > 0 && contacts)) return <LoadingIndicator />
    return (
        <ScrollView>
            <List.Section>
                <List.Subheader>Contact on FastChat</List.Subheader>
                {(contacts?.length > 0 && contacts) ? (
                    contacts
                        .filter(c => c.isOnFastChat)
                        .map((contact) => (
                            <List.Item
                                title={contact.name || contact.phoneNumber}
                                left={() => <Avatar
                                    bgColor={colors.disabled}
                                    uri={contact.avatarImg} />}
                                key={contact.id} />
                        ))
                ) : null}
            </List.Section>
            <List.Section>
                <List.Subheader>Invite a friend</List.Subheader>
                {(contacts?.length > 0 && contacts) ? (
                    contacts
                        .filter(c => !c.isOnFastChat)
                        .map((contact) => (
                            <List.Item
                                title={contact.name || contact.phoneNumber}
                                left={() => <Avatar
                                    bgColor={colors.disabled}
                                    uri={contact.avatarImg} />}
                                key={contact.id}
                                right={() => (
                                    <TouchableRipple style={{
                                        alignSelf: 'center',
                                        padding:5,
                                        marginRight:10,
                                        borderRadius:10
                                    }}
                                    rippleColor={colors.notification}
                                    onPress={()=>console.log("pressed")}>
                                        <Text
                                            style={{
                                                color: colors.notification,
                                                fontSize: 16,
                                            }}>Invite</Text>
                                    </TouchableRipple>
                                )} />
                        ))
                ) : null}
            </List.Section>
        </ScrollView>
    )
}

export default ContactFeed