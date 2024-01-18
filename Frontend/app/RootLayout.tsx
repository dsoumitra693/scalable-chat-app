import { Provider as PaperProvider, DarkTheme, Theme } from 'react-native-paper'
import { View } from 'react-native'
import React from 'react'
import {
  seren_frost_theme_colors,
  dark_purple_theme_colors,
  earth_tones_theme_colors,
  ocean_breeze_theme_colors,
  cool_sunshine_theme_colors
} from '../Theme'

interface LayoutProps {
  children: React.ReactNode
}

const theme: Theme = {
  ...DarkTheme,
  colors: seren_frost_theme_colors
}

const RootLayout = ({ children }: LayoutProps): React.JSX.Element => (
  <PaperProvider theme={theme}>
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </PaperProvider>
)

export default RootLayout

