import React, { useLayoutEffect } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useCheckCredentials, useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import { useTheme } from '@mui/material';
import { showError } from 'helpers/toast';
import { useAuth } from 'providers/AuthenticationProvider';

interface LauncherProps {
  idApp: string;
}

const Launcher = ({ idApp }: LauncherProps) => {
  //! State
  const theme = useTheme();
  const auth = useAuth();
  const {
    mutateAsync: checkCredentialsApp,
    isLoading: isCheckingApp,
    data: resCredentialApp,
  } = useCheckCredentials();

  const { data: resDetailApp, isLoading, error } = useGetAppIntegrationDetail(idApp || '');
  const item = resDetailApp?.data;
  const isItemHasCredential = !!resCredentialApp?.data;

  //! Function
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
        src={`${item?.launchUri}?token=${auth.accessToken}` || ''}
        frameBorder={0}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
      />
    </CommonStyles.Box>
  );
};

export default React.memo(Launcher);
