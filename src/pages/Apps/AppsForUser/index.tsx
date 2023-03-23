import React, { Fragment } from 'react';
import CommonStyles from 'components/CommonStyles';
import ListAvailableApps from './ListAvailableApps';
import ListInstalledApps from './ListInstalledApps';

const AppsForUser = () => {
  //! State

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Box sx={{ mb: 8 }}>
        <ListInstalledApps />
      </CommonStyles.Box>
      <ListAvailableApps />
    </Fragment>
  );
};

export default React.memo(AppsForUser);
