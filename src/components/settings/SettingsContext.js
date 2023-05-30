import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';
//
import { defaultSettings } from './config-setting';

// ----------------------------------------------------------------------

const initialState = {
  // themeMode, themeDirection etc..
  ...defaultSettings,
  // toggle Mode
  onToggleMode: () => {},
  // Global state vars
  loggedIn: false,
  currentUser: null,
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);
// context settings hook
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be used inside SettingsProvider');

  return context;
};

// ----------------------------------------------------------------------

export function SettingsProvider({ children }) {
  // const [open, setOpen] = useState(false);

  const [themeMode, setThemeMode] = useState(initialState.themeMode);
  const [loggedIn, setLoggedIn] = useState(initialState.loggedIn);
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);

  // looks for cookie in local storage with thememode - so that theme persists across tabs
  useEffect(() => {
    const mode = getCookie('themeMode') || defaultSettings.themeMode;
    setThemeMode(mode);
  }, []);

  // Mode
  const onToggleMode = useCallback(() => {
    const value = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(value);
    setCookie('themeMode', value);
  }, [themeMode]);

  const memoizedValue = useMemo(
    () => ({
      // Mode
      themeMode,
      onToggleMode,
      loggedIn,
      setLoggedIn,
      currentUser,
    }),
    [
      // dependency array
      themeMode,
      onToggleMode,
      loggedIn,
      setLoggedIn,
      currentUser,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function getCookie(name) {
  if (typeof document === 'undefined') {
    throw new Error('getCookie() is not supported on the server. Fallback to a different value when rendering on the server.');
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

function setCookie(name, value, exdays = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// function removeCookie(name) {
//   document.cookie = `${name}=;path=/;max-age=0`;
// }
