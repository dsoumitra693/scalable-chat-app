import React, { useState } from 'react'
import { Header, Messages, SendMsg } from '../../components/Chat'
import useMessage from '../../hooks/useMessage'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useGlobalSearchParams } from 'expo-router'

const Chat = ({ }) => {
  const { messages } = useMessage()
  const { colors } = useTheme()
  const [msges, setMsges] = useState(messages)
  const params = useGlobalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header name={params.name} avatar={params.avatarImg} />
      <Messages msges={msges} />
      <SendMsg phone={params.phone} msges={msges} setMsges={setMsges} />
    </View>
  )
}

export default Chat