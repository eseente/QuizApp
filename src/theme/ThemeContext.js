import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme == "light") {
        root.style.setProperty('--background-color', 'var(--background-color-dark)');
    } else {
        root.style.setProperty('--background-color', 'var(--background-color-light)');
    }
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
