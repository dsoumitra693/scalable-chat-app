import React from 'react'
import { View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper'

const ACTIVITY_INDICATOR_SIZE = 25;

const LoadingIndicator = React.memo(() => {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <ActivityIndicator size={ACTIVITY_INDICATOR_SIZE} color={colors.accent} style={{ top: 20 }} />
        </View>
    )
})

export default LoadingIndicator
