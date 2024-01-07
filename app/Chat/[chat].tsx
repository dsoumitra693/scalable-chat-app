import React, { useState } from 'react'
import { Header, Messages, SendMsg } from '../../components/Chat'
import useMessage from '../../hooks/useMessage'

const Chat = () => {
  const {messages} = useMessage()

  const [msges, setMsges] = useState(messages)
  return (
    <>
      <Header />
      <Messages msges={msges}/>
      <SendMsg msges={msges} setMsges={setMsges}/>
    </>
  )
}

export default Chat