import React, { useState } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { App } from 'interfaces/apps';
import { useTheme } from '@mui/material';
import { showError, showSuccess } from 'helpers/toast';
import { useInstallApp, useUninstallApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';

interface EachAppProps {
  item: App;
  isInstalled?: boolean;
}

const EachApp = ({ item, isInstalled }: EachAppProps) => {
  //! State
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { mutateAsync: installApp } = useInstallApp();
  const { mutateAsync: uninstallApp } = useUninstallApp();
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

  //! Render
  const renderButton = () => {
    if (isInstalled) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <a href={item?.launchUri || ''} target={'_blank'} rel='noreferrer'>
            <CommonStyles.Button startIcon={<CommonIcons.SendIcon />}>Launch</CommonStyles.Button>
          </a>
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
