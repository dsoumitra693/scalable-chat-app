import { IPeople} from "../Types";

export function insertSortedMsg(people: IPeople[], : IPeople) {
    const timestamp = new Date(newMessage.timestamp);

    let index = messages.length;
    for (let i = 0; i < messages.length; i++) {
        if (new Date(messages[i].timestamp) > timestamp) {
            index = i;
            break;
        }
    }

    messages.splice(index, 0, newMessage);
}