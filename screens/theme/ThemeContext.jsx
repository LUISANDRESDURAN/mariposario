import { createContext, useState, useContext } from 'react';


const lightTheme = {
  background: '#F8F8F8',
  cardBackground: '#FFFFFF',
  text: '#222222',
  subtext: '#666666',
  border: '#EEE',
  header: '#FFFFFF',
};
const darkTheme = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#FFFFFF',
  subtext: '#CCCCCC',
  border: '#333333',
  header: '#1E1E1E',
};


const ThemeContext = createContext();


export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  return useContext(ThemeContext);
}
