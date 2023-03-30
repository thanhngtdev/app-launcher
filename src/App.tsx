import React, { Suspense } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Page404 from 'pages/Page404';
import routes from 'routes/routesPrivate';
import PrivateRoute from 'components/PrivateRoute';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useSettingsTheme } from 'providers/SettingsThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import CommonStyles from 'components/CommonStyles';
import routesPublic from 'routes/routesPublic';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  //! State
  const { themeOfApp, loadingTheme } = useSettingsTheme();

  //! Function

  //! Render
  const renderContent = () => {
    return (
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={`${route.path}-layout`}
                path={route.path}
                element={
                  <route.layout>
                    <Outlet />
                  </route.layout>
                }
              >
                {route.routeChild.map((child, idx) => {
                  return (
                    <Route
                      key={`${child.path}-${idx}`}
                      path={child.path}
                      element={
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                          {child.isPrivateRoute ? (
                            <PrivateRoute>
                              <child.component />
                            </PrivateRoute>
                          ) : (
                            <child.component />
                          )}
                        </ErrorBoundary>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}

          {routesPublic.map((route) => (
            <Route key={route.name} path={route.path} element={<route.component />} />
          ))}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    );
  };

  if (loadingTheme) {
    return <CommonStyles.Loading />;
  }

  return (
    <Suspense fallback={<CommonStyles.Loading />}>
      <ThemeProvider theme={themeOfApp}>
        <CssBaseline />
        {renderContent()}
      </ThemeProvider>
    </Suspense>
  );
};

export default React.memo(App);
