import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommonStyles from 'components/CommonStyles';
import { useCheckCredentials, useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import { useTheme } from '@mui/material';
import { showError } from 'helpers/toast';
import { useAuth } from 'providers/AuthenticationProvider';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

const Launcher = () => {
  //! State
  const { id } = useParams();
  const theme = useTheme();
  const auth = useAuth();
  const {
    mutateAsync: checkCredentialsApp,
    isLoading: isCheckingApp,
    data: resCredentialApp,
  } = useCheckCredentials();

  const { data: resDetailApp, isLoading, error } = useGetAppIntegrationDetail(id || '');
  const item = resDetailApp?.data;
  const isItemHasCredential = !!resCredentialApp?.data;

  //! Function
  useLayoutEffect(() => {
    const mainRoot = document.querySelector('main');
    if (mainRoot) {
      mainRoot.classList.add('p-0');
    }

    return () => {
      if (mainRoot) {
        mainRoot.classList.remove('p-0');
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (item?.appClientId) {
      (async () => {
        try {
          await checkCredentialsApp({
            appClientId: item?.appClientId || '',
            userId: auth.user?.id || '',
          });
        } catch (error) {
          showError(error);
        }
      })();
    }
  }, [item, checkCredentialsApp]);

  //! Render
  if (isLoading || isCheckingApp) {
    return (
      <CommonStyles.Box sx={{ p: 2 }}>
        <CommonStyles.Loading />
      </CommonStyles.Box>
    );
  }

  if (!isItemHasCredential) {
    return (
      <CommonStyles.Box sx={{ p: 2 }}>
        <CommonStyles.Typography sx={{ color: theme.colors?.red }}>
          This APP not has Credentials
        </CommonStyles.Typography>

        <Link to={BaseUrl.AppManagement}>
          <CommonStyles.Button sx={{ mt: 2 }}>Back to Apps</CommonStyles.Button>
        </Link>
      </CommonStyles.Box>
    );
  }

  if (error) {
    showError(error);
    return (
      <CommonStyles.Typography sx={{ color: theme.colors?.red }}>
        Something wrong here!
      </CommonStyles.Typography>
    );
  }

  return (
    <CommonStyles.Box
      sx={{
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
        '& > iframe': { height: '100% ', width: '100%' },
      }}
    >
      <iframe
        src={item?.launchUri || ''}
        frameBorder={0}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
      />
    </CommonStyles.Box>
  );
};

export default React.memo(Launcher);
