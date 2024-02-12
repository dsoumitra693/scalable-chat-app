import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { IconButton, useTheme } from 'react-native-paper'
import { useSocket } from '../../providers/SocketProvider'
import { IMessage } from '../../Types'
import { useAuth } from '../../providers/AuthProvider'

const SendMsg = ({ msges, setMsges, phone }) => {
    const { colors } = useTheme()
    const [msg, setMsg] = useState('')
    const { currentUser } = useAuth()
    const { sendMessage } = useSocket()

    const handleMsgSent = (): void => {
        let newText = msg.trim()
        if (newText.length > 0) {
            setMsg('')
            let newMsg: IMessage = {
                content: newText,
                timestamp: new Date(),
                sender: currentUser.countrycode + currentUser.phone,
                reciver: phone,
                status: 'read'
            }
            sendMessage(newMsg)
            setMsges([...msges, newMsg])
        }
    }
    return (
        <View style={[styles.inputWrapper, { backgroundColor: colors.surface, }]}>
            <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Send Message..."
                placeholderTextColor={colors.disabled}
                multiline
                numberOfLines={5}
                maxLength={256}
                onChangeText={setMsg}
                value={msg}
                editable={true} />
            <IconButton icon="send"
                color={colors.primary}
                animated
                onPress={handleMsgSent} />
        </View>
    )
}

export default SendMsg

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 7,
        paddingLeft: 15,
        alignSelf: 'center',
        bottom: 5,
        borderRadius: 10
    },
    input: {
        flex: 1,
        fontSize: 18,
        height: 60,
        maxHeight: 90,
    }
})