import { View } from 'react-native'
import React from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import { useSetTheme } from '../../providers/ThemeProvider'
import { getThemeColors } from '../../Theme'


interface ThemeSectionProps {
    colorName: string
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({ colorName }) => {
    const { currentTheme, setCurrentTheme } = useSetTheme()
    const colors = getThemeColors(colorName)
    const changeTheme = () => {
        setCurrentTheme(colorName)
    }

    return (
        <View style={{ alignItems: 'center', marginBottom:20}}>
            <View style={{
                borderRadius: 10,
                borderWidth: currentTheme == colorName ? 5 : 0,
                borderColor: colors.notification,
                padding: 2,
                margin: 10
            }}>
                <TouchableRipple
                    centered
                    onPress={changeTheme}
                    style={{ borderRadius: 5 }}>
                    <View style={{
                        height: 150,
                        width: 140,
                        backgroundColor: colors.background,
                        borderRadius: 5,
                        padding: 10,
                    }}>
                        <View style={{
                            alignSelf: 'flex-start',
                            backgroundColor: colors.surface,
                            height: 20,
                            width: 80,
                            borderRadius: 5,
                            marginBottom: 10
                        }}></View>
                        <View style={{
                            alignSelf: 'flex-end',
                            backgroundColor: colors.primary,
                            height: 20,
                            width: 80,
                            borderRadius: 5
                        }}></View>
                    </View>
                </TouchableRipple>
            </View>
            <Text style={{ fontSize: 16 }}>{colorName}</Text>
        </View>
    )
}


export default ThemeSection