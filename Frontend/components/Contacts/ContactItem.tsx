import React from 'react'
import { List, TouchableRipple, useTheme } from 'react-native-paper'
import Avatar from '../Avatar'
import { IContacts } from '../../Types'
import { GestureResponderEvent } from 'react-native';

interface ContactItemProps {
    contact: IContacts;
    right?: (props: {
        color: string;
        style?: {
            marginRight: number;
            marginVertical?: number;
        };
    }) => React.ReactNode | undefined;

    onPress?: (event: GestureResponderEvent) => void
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, right, onPress }) => {
    const { colors } = useTheme()
    return (
        <TouchableRipple 
        rippleColor={colors.backdrop}
        onPress={onPress}>
            <List.Item
                title={contact.name || contact.phoneNumber}
                left={() => <Avatar
                    bgColor={colors.disabled}
                    uri={contact.avatarImg} />}
                key={contact.id}
                right={right} />
        </TouchableRipple>
    )
}

export default ContactItem