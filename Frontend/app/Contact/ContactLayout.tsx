import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const ContactLayout = ({ children }) => {
    const { colors } = useTheme()
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            {children}
        </View>
    )
}

export default ContactLayout