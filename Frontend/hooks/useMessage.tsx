import { useState } from 'react';
import { IMessage } from '../Types'
import { usePeoples } from '../providers/PeopleProvider';

interface useMessageReturnType {
  getMessages: (phone: string) => Promise<IMessage[]>;
  setMessages: (msg: IMessage) => void
}

function useMessage(): useMessageReturnType {
  const [msges, setMsges] = useState<IMessage[]>([])
  const { getPeoples } = usePeoples()

  const getMessages = async (phone: string): Promise<IMessage[]> => {
    if (msges.length > 0) return msges
    let peoples = await getPeoples()
    let people = peoples.find(p => p.phone == phone)
    if (people) {
      console.log("this is people", people.msges)
      setMsges(people.msges)
    }

    return people ? people.msges : []
  }

  let setMessages = (msg: IMessage) => {
    setMsges(prev => [...prev, msg])
  }
  return { getMessages, setMessages }

}

export default useMessage