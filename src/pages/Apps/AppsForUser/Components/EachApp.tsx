import React, { useState } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { App } from 'interfaces/apps';
import { useTheme } from '@mui/material';
import { showError, showSuccess } from 'helpers/toast';
import { useInstallApp, useUninstallApp, useCreateApproval } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { useTabHandler } from 'providers/TabHandlerProvider';
import Launcher from 'pages/Launcher';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

interface EachAppProps {
  item: App;
  isInstalled?: boolean;
}

const EachApp = ({ item, isInstalled }: EachAppProps) => {
  //! State
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { addNewTab } = useTabHandler();
  const queryClient = useQueryClient();
  const { mutateAsync: installApp } = useInstallApp();
  const { mutateAsync: uninstallApp } = useUninstallApp();
  const { mutateAsync: createRequest } = useCreateApproval();
  const [loading, setLoading] = useState(false);

  //! Function
  const onClickInstall = async () => {
    try {
      setLoading(true);
      await installApp({ id: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

      showSuccess('Install app successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const onClickUninstall = async () => {
    try {
      setLoading(true);
      await uninstallApp({ id: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

      showSuccess('Uninstall app successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const onClickRequestAccess = async () => {
    try {
      setLoading(true);
      await createRequest({ appId: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppStore] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

      showSuccess('Request access successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const onClickLaunch = () => {
    addNewTab({
      label: item.name,
      value: item.id,
      content: <Launcher idApp={item.id} launchUri={item.launchUri} />,
      openNewTab: true,
    });

    if (!location.pathname.includes(BaseUrl.AppManagement)) {
      navigate(BaseUrl.AppManagement);
    }
  };

  //! Render
  const renderButton = () => {
    if (isInstalled) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <CommonStyles.Button onClick={onClickLaunch} startIcon={<CommonIcons.SendIcon />}>
            Launch
          </CommonStyles.Button>

          <CommonStyles.Button
            startIcon={<CommonIcons.UninstallIcon />}
            variant='outlined'
            loading={loading}
            onClick={onClickUninstall}
          >
            Uninstall
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    if (!item.isAssigned) {
      return (
        <CommonStyles.Button
          loading={loading}
          startIcon={<CommonIcons.RequestAccess />}
          onClick={onClickRequestAccess}
        >
          Request Access
        </CommonStyles.Button>
      );
    }

    return (
      <CommonStyles.Button
        loading={loading}
        startIcon={<CommonIcons.DownloadingIcon />}
        onClick={onClickInstall}
      >
        Install
      </CommonStyles.Button>
    );
  };

  return (
    <CommonStyles.Box
      key={item.id}
      sx={{
        display: 'flex',
        gap: 3,
        boxShadow: 3,
        borderRadius: 1,
        p: 2,
        width: 'calc(100% / 3 - 16px)',

        [theme.breakpoints.down('lg')]: {
          width: 'calc(100% / 2 - 16px)',
        },

        [theme.breakpoints.down('md')]: {
          width: 'calc(100% / 2 - 12px)',
        },

        [theme.breakpoints.down('sm')]: {
          width: 'calc(100%)',
        },
      }}
    >
      <CommonStyles.Box>
        <CommonStyles.Avatar src={item?.icon || ''} sx={{ width: 70, height: 70 }} />
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CommonStyles.Box>
          <CommonStyles.Typography sx={{ overflowWrap: 'anywhere' }}>
            {item?.name || '-'}
          </CommonStyles.Typography>
          <CommonStyles.Typography variant='caption' sx={{ color: theme.colors?.gray }}>
            {item?.developerName || '-'}
          </CommonStyles.Typography>
          <CommonStyles.Typography sx={{ mt: 2 }} variant='subtitle2'>
            {item.summary}
          </CommonStyles.Typography>
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {renderButton()}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(EachApp);
