import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native'
import React from 'react'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    secondary: '#7a5187'
  },
};
interface LayoutProps {
  children:React.ReactNode
}


const RootLayout = ({children}:LayoutProps): React.JSX.Element => (
    <PaperProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary} />
        <View style={{flex:1, backgroundColor:theme.colors.primary}}>
            {children}
        </View>
    </PaperProvider>
)

export default RootLayout

