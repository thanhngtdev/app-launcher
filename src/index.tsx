import App from 'App';
import ReactDOM from 'react-dom/client';
// import AuthProvider from 'providers/AuthenticationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

import './index.css';
import './styles/temp.scss';
import ToggleThemeProvider from 'providers/ToggleThemeProvider';
import CachedProvider from 'providers/CachedProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationProvider from 'providers/AuthenticationProvider';
import { GlobalStyles } from '@mui/material';
import TabHandlerProvider from 'providers/TabHandlerProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 30 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CachedProvider>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ToggleThemeProvider>
          <GlobalStyles
            styles={{
              a: {
                textDecoration: 'none',
              },
            }}
          />
          <AuthenticationProvider>
            <TabHandlerProvider>
              <App />
            </TabHandlerProvider>
          </AuthenticationProvider>
          <ToastContainer theme='light' />
        </ToggleThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </CachedProvider>
);
