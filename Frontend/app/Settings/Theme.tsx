import { View } from 'react-native'
import React from 'react'
import SettingsLayout from './SettingsLayout'
import { Header } from '../../components/Settings'
import { useTheme } from 'react-native-paper'
import { themesName } from '../../Theme'
import ThemeSection from './ThemeSection'
import { FlashList } from '@shopify/flash-list'

const Theme = () => {
    const theme = useTheme()

    return (
        <SettingsLayout>
            <Header title='Theme' />
            <View style={{
                flex: 1,
                backgroundColor: theme.colors.placeholder,
            }}>
                <FlashList
                    data={themesName}
                    estimatedItemSize={118}
                    numColumns={2}
                    renderItem={(item) => {
                        return (
                            <ThemeSection colorName={item.item} key={item.index} />
                        )
                    }}
                />
            </View>

        </SettingsLayout>
    )
}

export default Theme