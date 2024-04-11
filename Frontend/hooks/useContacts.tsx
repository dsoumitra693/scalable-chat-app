import * as Contacts from 'expo-contacts';
import { IContacts, IUser } from '../Types';
import useUser from './useUser';

const defaultAvatarImg = 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';

const useContacts = () => {
    const { searchUser } = useUser();

    const mapToIContacts = (contact: Contacts.Contact): IContacts => {
        const phoneNumber = /^(\+91|91)/.test(contact?.phoneNumbers?.[0]?.number)
            ? contact?.phoneNumbers?.[0]?.number
            : `+91${contact?.phoneNumbers?.[0]?.number}`.replaceAll(" ", '');

        return {
            id: contact?.id ?? '',
            name: contact?.name ?? '',
            phoneNumber,
            isOnFastChat: false,
            avatarImg: contact?.imageAvailable ? contact?.image?.uri : defaultAvatarImg,
        };
    };

    const getLocalContacts = async () => {
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
                return data
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }

    const getContacts = async () => {
        try {
            let data = await getLocalContacts();

            if (data.length > 0) {
                const filteredContacts: IContacts[] = data
                    .filter(contact => contact?.phoneNumbers?.length > 0)
                    .map(mapToIContacts);

                const phoneNumbers = filteredContacts.map(contact => contact.phoneNumber);
                const users = await searchUser(phoneNumbers);

                const userMap = new Map<string, IUser>();
                users.forEach(user => {
                    userMap.set(user.phone, user);
                });

                const updatedContacts: IContacts[] = filteredContacts.map(contact => {
                    const matchedUser = userMap.get(contact.phoneNumber);

                    return {
                        ...contact,
                        id: matchedUser ? matchedUser.id : contact.id,
                        isOnFastChat: !!matchedUser,
                    };
                });

                return updatedContacts;
            } else {
                return { error: 'No contacts found' };
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            return { error: 'Failed to fetch contacts' };
        }
    };

    return { getContacts, getLocalContacts };
};

export default useContacts;
