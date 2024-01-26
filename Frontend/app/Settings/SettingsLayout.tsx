import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const SettingsLayout = ({ children }) => {
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

export default SettingsLayout