import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { copyToClipboard } from 'helpers';
import { showError, showSuccess } from 'helpers/toast';
import { useGenerateAppCredentials, useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { useParams } from 'react-router-dom';
import { useAuth } from 'providers/AuthenticationProvider';

const TabAuthentication = () => {
  //! State
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { data: resDetailApp, isLoading } = useGetAppIntegrationDetail(id || '');
  const app = resDetailApp?.data;

  const theme = useTheme();
  const { mutateAsync: generateAppCredentials, isLoading: isGenerating } =
    useGenerateAppCredentials();
  const queryClient = useQueryClient();

  //! Function
  const listAuthenticationKey = [
    {
      label: 'Authentication Client ID',
      value: app?.appClientId,
      onClickCopy: () => {
        copyToClipboard(app?.appClientId);
        showSuccess('Copied!');
      },
      icon: CommonIcons.KeyIcon,
    },
    {
      label: 'Authentication Client Secret',
      value: app?.appClientSecret,
      onClickCopy: () => {
        copyToClipboard(app?.appClientSecret);
        showSuccess('Copied!');
      },
      icon: CommonIcons.LockIcon,
    },
    {
      label: 'App Client Name',
      value: app?.appClientName,
      onClickCopy: () => {
        copyToClipboard(app?.appClientName);
        showSuccess('Copied!');
      },
      icon: CommonIcons.AppsIcon,
    },
  ];

  const onClickGenerate = async () => {
    try {
      await generateAppCredentials({ appId: app?.id || '' });
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getAppDetail],
      });
      showSuccess('Generate app credentials successfully!');
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
        <b>{app?.name}</b>
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <CommonStyles.Typography variant='h6'>Authentication your app</CommonStyles.Typography>

        {isAdmin && (
          <CommonStyles.Button
            startIcon={<CommonIcons.Reset />}
            variant='outlined'
            onClick={onClickGenerate}
            loading={isGenerating}
          >
            Generate App Credentials
          </CommonStyles.Button>
        )}
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {listAuthenticationKey.map((el) => {
          return (
            <CommonStyles.Box sx={{ display: 'flex', gap: 3 }} key={el.label}>
              <el.icon sx={{ fontSize: 60 }} />

              <CommonStyles.Box>
                <CommonStyles.Typography variant='h6' sx={{ color: theme.colors?.purple }}>
                  {el.label}
                </CommonStyles.Typography>
                <CommonStyles.Typography variant='body1' sx={{ color: theme.colors?.gray }}>
                  {el?.value || '-'}
                </CommonStyles.Typography>

                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <CommonStyles.Button variant='outlined' onClick={el.onClickCopy}>
                    COPY
                  </CommonStyles.Button>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(TabAuthentication);
