import { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import { IContacts } from '../Types';
import { random_bool } from '../utils/randomBool';

const defaultAvatarImg = 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'

const useContacts = () => {
    const [contacts, setContacts] = useState<IContacts[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.PhoneNumbers,
                            Contacts.Fields.Name,
                            Contacts.Fields.Image,
                            Contacts.Fields.ID,
                        ],
                    });

                    if (data.length > 0) {
                        const _contacts: IContacts[] = data
                            .filter(contact => contact?.phoneNumbers?.length > 0)
                            .map(contact => ({
                                id: contact?.id ?? '',
                                name: contact?.name ?? '',
                                phoneNumber: contact?.phoneNumbers[0]?.number ?? '',
                                isOnFastChat: random_bool(),
                                avatarImg: contact.imageAvailable ? contact.image.uri : defaultAvatarImg
                            }));

                        setContacts(_contacts);
                    } else {
                        setContacts([]); // No contacts found
                    }
                }
            } catch (error) {
                console.error(error);
                setContacts([]); // Handle error by setting an empty array
            }
        })();
    }, []);

    return contacts;
};

export default useContacts;

