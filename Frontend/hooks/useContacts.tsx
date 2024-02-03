import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { IContacts, IUser } from '../Types';
import useUser from './useUser';

const defaultAvatarImg =
    'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';

const useContacts = () => {
    const [contacts, setContacts] = useState<IContacts[] | []>([]);
    const { searchUser } = useUser();
    const [contactsCache, setContactsCache] = useState(new Map<string, IContacts>());
    const [usersCache, setUsersCache] = useState(new Map<string, IUser>());

    const mapToIContacts = (contact) => {
        const phoneNumber =
            /^(\+91|91)/.test(contact?.phoneNumbers?.[0]?.number) ? contact.phoneNumbers[0].number : `+91${contact.phoneNumbers?.[0]?.number}`;

        return {
            id: contact?.id || '',
            name: contact?.name || '',
            phoneNumber: phoneNumber.replaceAll(' ', ''),
            isOnFastChat: false,
            avatarImg: contact.imageAvailable ? contact.image.uri : defaultAvatarImg,
        };
    };

    const getContacts = async () => {
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

                const filteredContacts = data
                    .filter((contact) => contact?.phoneNumbers?.length > 0)
                    .map(mapToIContacts);

                const phoneNumbers = filteredContacts.map((contact) => contact.phoneNumber);
                const cachedContacts = phoneNumbers.map((phoneNumber) => contactsCache.get(phoneNumber)).filter(Boolean);
                const cachedUsers = phoneNumbers.map((phoneNumber) => usersCache.get(phoneNumber)).filter(Boolean);

                // Get non-cached users
                const nonCachedPhoneNumbers = phoneNumbers.filter(
                    (phoneNumber) => !contactsCache.has(phoneNumber) || !usersCache.has(phoneNumber)
                );
                const users = await searchUser(nonCachedPhoneNumbers);

                // Update caches
                const newUsersCache = new Map(usersCache);
                users.forEach((user, index) => {
                    newUsersCache.set(nonCachedPhoneNumbers[index], user);
                });
                setUsersCache(newUsersCache);

                const newContactsCache = new Map(contactsCache);
                filteredContacts.forEach((contact) => {
                    newContactsCache.set(contact.phoneNumber, contact);
                });
                setContactsCache(newContactsCache);

                const updatedContacts = filteredContacts.map((contact) => {
                    const matchedContact = cachedContacts.find((c) => c.phoneNumber === contact.phoneNumber) || contact;
                    const matchedUser = cachedUsers.find((u) => u.phone === contact.phoneNumber);

                    return {
                        ...matchedContact,
                        id: matchedUser ? matchedUser.id : matchedContact.id,
                        isOnFastChat: !!matchedUser,
                    };
                });

                setContacts(updatedContacts);
            } else {
                setContacts([]);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]); // Handle error by setting an empty array
        }
    };

    useEffect(() => {
        getContacts();
    }, [contactsCache, usersCache]);

    return contacts;
};

export default useContacts;
