import { Provider as PaperProvider } from 'react-native-paper'
import { View } from 'react-native'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}


const RootLayout = ({ children }: LayoutProps): React.JSX.Element => (
  <PaperProvider>
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </PaperProvider>
)

export default RootLayout

