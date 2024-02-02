import React from 'react';
import { Navigate } from 'react-router-dom';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import { useAuth } from 'providers/AuthenticationProvider';
import Logo from 'assets/logo.svg';

const Login = () => {
  //! State
  const theme = useTheme();
  const auth = useAuth();

  //! Function

  //! Render
  if (auth.isLogged) {
    return <Navigate to={auth.initialPathName} replace />;
  }

  if (auth.loading) {
    return (
      <CommonStyles.Box sx={{ p: 2 }}>
        <CommonStyles.Loading />
      </CommonStyles.Box>
    );
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={() => {}}
    >
      {() => {
        return (
          <Form>
            <CommonStyles.Box
              sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.palette.primary.main,
              }}
            >
              <img alt='Logo' src={Logo} />
              <CommonStyles.Box
                sx={{
                  boxShadow: 4,
                  p: 3,
                  borderRadius: 2,
                  minWidth: 600,
                  backgroundColor: theme.colors?.white,
                }}
              >
                <CommonStyles.Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
                  Sign in
                </CommonStyles.Typography>
                <CommonStyles.Box
                  sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  {/* <CommonStyles.Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '55%' }}
                  >
                    <FastField component={TextField} name='username' label='Username' fullWidth />
                    <FastField
                      component={TextField}
                      name='password'
                      label='Password'
                      type='password'
                      fullWidth
                    />

                    <CommonStyles.Button type='submit'>Login</CommonStyles.Button>
                  </CommonStyles.Box>

                  <CommonStyles.Box>
                    <CommonStyles.Typography sx={{ color: theme.colors?.gray }}>
                      OR
                    </CommonStyles.Typography>
                  </CommonStyles.Box> */}

                  <CommonStyles.Box sx={{ width: '100%' }}>
                    <CommonStyles.Button
                      variant='outlined'
                      fullWidth
                      onClick={() => {
                        auth.loginRedirect();
                      }}
                    >
                      Sign In by AWS
                    </CommonStyles.Button>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(Login);
