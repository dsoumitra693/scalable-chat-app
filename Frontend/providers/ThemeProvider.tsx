import React, { useContext, useState } from 'react';
import { Provider as PaperProvider, DarkTheme, Theme } from 'react-native-paper'
import { getThemeColors, } from '../Theme'

interface ThemeProviderProps {
    children?: React.ReactNode;
}

interface IThemeContext {
    currentTheme: string;
    setCurrentTheme: (q: string) => any;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);
export const useSetTheme = () => {
    const state = useContext(ThemeContext)
    if (state) return state

    throw new Error("useTheme: State is not define")
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<string>("Seren Frost")
    return (
        <PaperProvider theme={{
            ...DarkTheme,
            colors: getThemeColors(currentTheme)
        }} >
            <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>
        </PaperProvider >
    )
}

export default ThemeProvider