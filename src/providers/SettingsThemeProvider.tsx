import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { useGetPlatformSettings } from 'hooks/platform/usePlatformHooks';
import { Theme } from '@mui/material';
import { Platform } from 'services/platformService';
import { isEmpty, isEqual, isObject } from 'lodash';

export enum ModeThemeEnum {
  light = 'light',
  dark = 'dark',
}

interface ToggleThemeContextI {
  themeOfApp: Theme;
  mode: ModeThemeEnum;
  toggleTheme: () => void;
  loadingTheme: boolean;
  settings?: Platform;
}

const ToggleThemeContext = createContext<ToggleThemeContextI>({
  themeOfApp: {} as any,
  mode: ModeThemeEnum.light,
  toggleTheme: () => {},
  loadingTheme: true,
  settings: {} as any,
});

export const useSettingsTheme = () => useContext(ToggleThemeContext);

const KEY_THEME = 'theme';
const KEY_SETTINGS = 'settings';
const SettingsThemeProvider = ({ children }: { children: any }) => {
  //! State
  const { data: resPlatform, isLoading: loadingTheme } = useGetPlatformSettings();
  const theme = (localStorage.getItem(KEY_THEME) as ModeThemeEnum) || ModeThemeEnum.light;
  const [mode, setMode] = useState(theme);

  const settingsCached =
    localStorage.getItem(KEY_SETTINGS) !== 'undefined' &&
    localStorage.getItem(KEY_SETTINGS) !== null
      ? JSON.parse(localStorage.getItem(KEY_SETTINGS) || '')
      : null;

  const settings = useMemo(() => {
    if (isObject(resPlatform?.data) && isObject(settingsCached)) {
      if (!isEqual(settingsCached, resPlatform?.data)) {
        localStorage.setItem(KEY_SETTINGS, JSON.stringify(resPlatform?.data));
        return resPlatform?.data;
      }
    }

    if (!isEmpty(settingsCached)) {
      return settingsCached;
    }

    return resPlatform?.data;
  }, [settingsCached, resPlatform?.data]) as Platform;

  const mainColour = settings?.mainColour || '#000000';

  //! Funtion
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      if (prevMode === ModeThemeEnum.light) {
        localStorage.setItem(KEY_THEME, ModeThemeEnum.dark);
        return ModeThemeEnum.dark;
      }

      localStorage.setItem(KEY_THEME, ModeThemeEnum.light);
      return ModeThemeEnum.light;
    });
  }, []);

  const themeOfApp = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `"Open Sans", sans-serif`,
        },
        palette: {
          mode: mode,
          primary: {
            main: '#147b77',
          },
        },
        colors: {
          purple: '#611f69',
          green: '#2eb67d',
          red: 'red',
          yellow: '#ecb22e',
          blue: '#36c5f0',
          white: '#fff',
          black: 'rgb(18, 18, 18)',
          gray: '#fafafb',
          grayLight: '#F2F2F2',
          border: '#dde0e2',
          borderInput: '#e8ebeb',
        },
      }),
    [mainColour]
  );

  //! Render
  const value = useMemo(() => {
    return { settings, themeOfApp, loadingTheme, mode, toggleTheme };
  }, [themeOfApp, mode, toggleTheme, loadingTheme, settings]);

  return <ToggleThemeContext.Provider value={value}>{children}</ToggleThemeContext.Provider>;
};

export default SettingsThemeProvider;
