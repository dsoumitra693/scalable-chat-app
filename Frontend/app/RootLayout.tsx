import { Provider as PaperProvider,DarkTheme, Theme } from 'react-native-paper'
import { View } from 'react-native'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const theme:Theme = {
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    background:"#21353b",
    primary:"#ff4f5b"
  }
}

const RootLayout = ({ children }: LayoutProps): React.JSX.Element => (
  <PaperProvider theme={theme}>
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </PaperProvider>
)

export default RootLayout

