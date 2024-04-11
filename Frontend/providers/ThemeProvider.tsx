import { Provider as PaperProvider, DarkTheme, Theme } from 'react-native-paper'
import { getThemeColors, } from '../Theme'
import React, { useContext, useMemo, useState } from 'react';

interface IThemeContext {
    currentTheme: string;
    setCurrentTheme: (q: string) => void;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);
export const useSetTheme = () => {
    const state = useContext(ThemeContext)
    if (state) return state

    throw new Error("useTheme: State is not define")
}

/**
 * A component that manages the current theme of the application and provides it to its children components through the ThemeContext.
 * @param {React.ReactNode} children - The components that will be wrapped by the ThemeProvider.
 * @returns {React.ReactNode} - The wrapped components.
 */
const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('Material Design');

  const memoizedTheme = useMemo(() => getThemeColors(currentTheme), [currentTheme]);

  return (
    <PaperProvider theme={{ ...DarkTheme, colors: memoizedTheme }}>
      <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
        {children}
      </ThemeContext.Provider>
    </PaperProvider>
  );
};


export default ThemeProvider