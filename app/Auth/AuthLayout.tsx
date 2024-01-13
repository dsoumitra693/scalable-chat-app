import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const AuthLayout = ({ children }) => {
    const { colors } = useTheme()
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        }}>
            {children}
        </View>
    )
}

export default AuthLayout