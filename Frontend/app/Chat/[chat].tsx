import React, { useState } from 'react'
import { Header, Messages, SendMsg } from '../../components/Chat'
import useMessage from '../../hooks/useMessage'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

const Chat = () => {
  const {messages} = useMessage()
  const {colors} = useTheme()
  const [msges, setMsges] = useState(messages)
  return (
    <View style={{flex:1, backgroundColor:colors.background}}>
      <Header />
      <Messages msges={msges}/>
      <SendMsg msges={msges} setMsges={setMsges}/>
    </View>
  )
}

export default Chat