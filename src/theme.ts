import { createTheme } from '@mui/material/styles';

type Colors = {
  purple?: string;
  green?: string;
  red?: string;
  yellow?: string;
  blue?: string;
  white?: string;
  black?: string;
  gray?: string;
  grayLight?: string;
  border?: string;
  borderInput?: string;
  borderIcon?: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    colors?: Colors;
  }
  interface ThemeOptions {
    colors?: Colors;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
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
    gray: '#fafafb',
    grayLight: '#F2F2F2',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: '#fafafb',
    grayLight: '#F2F2F2',
  },
});

const theme = (mode?: 'dark' | 'light') => (mode === 'dark' ? darkTheme : lightTheme);

export { theme };
