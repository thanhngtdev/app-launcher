import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useAuth } from 'providers/AuthenticationProvider';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogOptionCreateApp from 'pages/Apps/Dialogs/DialogOptionCreateApp';
import DialogCreateApp from 'pages/Apps/Dialogs/DialogCreateApp';
import { useSettingsTheme } from 'providers/SettingsThemeProvider';
import { useGetListInstalledApp } from 'hooks/app/useAppHooks';
import EachApp from 'pages/Apps/AppsForUser/Components/EachApp';

// interface AppsProps {}

const Apps = () => {
  //! State
  const { isUser } = useAuth();
  const { settings } = useSettingsTheme();
  const { data: resInstalled, isLoading } = useGetListInstalledApp({
    filter: '',
    skip: 0,
    take: 4,
  });

  const installedApps = resInstalled?.data?.items || [];

  const {
    open: openOptionsCreateApp,
    toggle: toggleOptionCreateApp,
    shouldRender: shouldRenderOptionCreateApp,
  } = useToggleDialog();

  const {
    open: openCreateApp,
    toggle: toggleCreateApp,
    shouldRender: shouldRenderCreateApp,
  } = useToggleDialog();

  //! Function

  //! Render
  const renderAppsInstalled = () => {
    if (isLoading) {
      return <CommonStyles.Loading />;
    }

    return (
      <CommonStyles.Box
        sx={{
          display: 'flex',
          gap: 2,
          '& > div': {
            width: 'calc(100% / 2) !important',
          },
        }}
      >
        {installedApps.length <= 0 && (
          <CommonStyles.Typography>No app(s) installed!</CommonStyles.Typography>
        )}
        {installedApps.map((app) => {
          return <EachApp key={app.id} item={app} isInstalled />;
        })}
      </CommonStyles.Box>
    );
  };

  const renderSummaryHeading = () => {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography
          dangerouslySetInnerHTML={{ __html: settings?.summaryHeading || '' }}
        />

        {!isUser && (
          <CommonStyles.Button
            sx={{ mt: 2 }}
            startIcon={<CommonIcons.AddIcon />}
            onClick={toggleOptionCreateApp}
          >
            CREATE APP
          </CommonStyles.Button>
        )}
      </CommonStyles.Box>
    );
  };

  return (
    <CommonStyles.Box className='editor'>
      {shouldRenderOptionCreateApp && (
        <DialogOptionCreateApp
          isOpen={openOptionsCreateApp}
          toggle={toggleOptionCreateApp}
          onClickOption={({ value }) => {
            if (value === 0) {
              toggleCreateApp();
            }

            toggleOptionCreateApp();
          }}
        />
      )}

      {shouldRenderCreateApp && <DialogCreateApp isOpen={openCreateApp} toggle={toggleCreateApp} />}

      <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 6 }}>
        <CommonStyles.Box sx={{ width: '100%' }}>
          <img src={settings?.brandLogo} alt='brand-logo' style={{ width: '100%' }} />
        </CommonStyles.Box>

        {renderSummaryHeading()}
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <CommonStyles.Box>
          <CommonStyles.Typography
            dangerouslySetInnerHTML={{ __html: settings?.detailText || '' }}
          />
        </CommonStyles.Box>

        {renderAppsInstalled()}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Apps);
