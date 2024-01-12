import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { IconButton, useTheme } from 'react-native-paper'
import { useSocket } from '../../providers/SocketProvider'

const SendMsg = ({ msges, setMsges }) => {
    const { colors } = useTheme()
    const [msg, setMsg] = useState<string>()

    const {sendMessage} = useSocket()

    const handleMsgSent = (): void => {
        if(msg.trim().length > 0) {
            setMsg('')
            let newMsg = {
                content: msg as string,
                timestamp: '12:00',
                user: 'Soumo',
                status: 'read'
            }
            sendMessage(newMsg)
            setMsges([...msges, newMsg])
        }
    }
    return (
        <View style={[styles.inputWrapper, { backgroundColor: colors.background, }]}>
            <TextInput
                style={styles.input}
                placeholder="Send Message..."
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