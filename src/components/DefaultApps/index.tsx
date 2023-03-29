import React, { Fragment } from 'react';
import CommonStyles from 'components/CommonStyles';
import ListInstalledApps from 'components/ListInstalledApps';
import { useAuth } from 'providers/AuthenticationProvider';
import TableListApp from 'pages/Apps/Components/TableListApp';
import ListStoreApps from 'components/ListStoreApps';

const DefaultApps = React.memo(() => {
  const { isUser, isAppManager } = useAuth();

  if (isUser) {
    return (
      <CommonStyles.Box sx={{ p: 2 }}>
        <CommonStyles.Box sx={{ mb: 8 }}>
          <ListInstalledApps />
        </CommonStyles.Box>
        <ListStoreApps />
      </CommonStyles.Box>
    );
  }

  return (
    <CommonStyles.Box sx={{ p: 2 }}>
      <TableListApp />

      {isAppManager && (
        <Fragment>
          <CommonStyles.Box sx={{ mt: 8, mb: 8 }}>
            <ListInstalledApps />
          </CommonStyles.Box>

          <ListStoreApps />
        </Fragment>
      )}
    </CommonStyles.Box>
  );
});

export default DefaultApps;
