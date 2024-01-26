
import { View } from 'react-native'
import React from 'react'
import ThemeProvider from '../providers/ThemeProvider'


interface LayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: LayoutProps): React.JSX.Element => {

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </ThemeProvider>
  )
}

export default RootLayout

