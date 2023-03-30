import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { useGetPlatformSettings } from 'hooks/platform/usePlatformHooks';
import { Theme } from '@mui/material';
import { Platform } from 'services/platformService';

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
const SettingsThemeProvider = ({ children }: { children: any }) => {
  //! State
  const { data: resPlatform, isLoading: loadingTheme } = useGetPlatformSettings();
  const theme = (localStorage.getItem(KEY_THEME) as ModeThemeEnum) || ModeThemeEnum.light;
  const [mode, setMode] = useState(theme);

  const settings = resPlatform?.data;
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
        palette: {
          mode: mode,
          primary: {
            main: mainColour,
          },
        },
        colors: {
          purple: '#611f69',
          green: '#2eb67d',
          red: '#e01e5a',
          yellow: '#ecb22e',
          blue: '#36c5f0',
          white: '#fff',
          black: 'rgb(18, 18, 18)',
          gray: 'rgba(0,0,0,0.4)',
          grayLight: '#F2F2F2',
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
