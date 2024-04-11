import { useRouter } from 'expo-router'
import React from 'react'
import { Divider, List, TouchableRipple, useTheme } from 'react-native-paper'

const Main = () => {
    const { colors } = useTheme()
    const router = useRouter()

    const handlePress = () => {
        router.push('/Settings/Theme')
    }

    const renderLeftIcon = () => {
        return <List.Icon icon="palette" />
    }

    const renderRightIcon = () => {
        return <List.Icon icon="chevron-right" />
    }

    const memoizedColors = React.useMemo(() => colors, [])

    return (
        <List.Section>
            <List.Subheader>General</List.Subheader>
            <TouchableRipple onPress={handlePress}>
                <List.Item title="Theme"
                    left={renderLeftIcon}
                    right={renderRightIcon}
                />
            </TouchableRipple>
            <Divider style={{ backgroundColor: memoizedColors.disabled }} inset />
        </List.Section>
    )
}

export default Main