import React, { createContext, useContext, useState, useEffect } from 'react';

const QrContext = createContext();

export const QrProvider = ({ children }) => {
  const [data, setData] = useState('https://github.com/GIT-VERBECK');
  const [dotsColor, setDotsColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoDataUrl, setLogoDataUrl] = useState(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      return localStorage.getItem('vercode-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('vercode-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    data, setData,
    dotsColor, setDotsColor,
    bgColor, setBgColor,
    logoDataUrl, setLogoDataUrl,
    theme, toggleTheme
  };

  return (
    <QrContext.Provider value={value}>
      {children}
    </QrContext.Provider>
  );
};

export const useQrState = () => useContext(QrContext);
