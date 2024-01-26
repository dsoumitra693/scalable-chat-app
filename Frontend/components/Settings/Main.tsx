import { useRouter } from 'expo-router'
import React from 'react'
import { Divider, List, TouchableRipple, useTheme } from 'react-native-paper'

const Main = () => {
    const { colors } = useTheme()
    const router = useRouter()
    return (
        <List.Section>
            <List.Subheader>General</List.Subheader>
            <TouchableRipple onPress={() => router.push('/Settings/Theme')}>
                <List.Item title="Theme"
                    left={() => <List.Icon icon="palette" />}
                    right={() => <List.Icon icon="chevron-right" />}
                />
            </TouchableRipple>
            <Divider style={{ backgroundColor: colors.disabled }} inset />
        </List.Section>
    )
}

export default Main