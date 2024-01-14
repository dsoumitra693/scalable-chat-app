import { IMessage } from '../Types'
import {  msgData } from '../data/msgData'

interface useMessageReturnType{
  messages:IMessage[];
  setMessages:(msg:IMessage)=>void
}

function useMessage():useMessageReturnType {
    let messages = msgData as IMessage[]
    let setMessages = (msg:IMessage)=> {
      msgData.push(msg)
    }
  return {messages, setMessages}

}

export default useMessage