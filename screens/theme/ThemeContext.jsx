import { createContext, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';


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
export const AuthContext = React.createContext();


export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useTheme() {
  return useContext(ThemeContext);
}
