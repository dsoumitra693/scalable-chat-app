import { Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const LoadingIndicator = () => {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <ActivityIndicator size={25} color={colors.accent} style={{ top: 20 }} />
        </View>
    )
}

export default LoadingIndicator
