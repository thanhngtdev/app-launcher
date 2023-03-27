import React, { Fragment } from 'react';
import CommonStyles from 'components/CommonStyles';
import ListInstalledApps from '../../../components/ListInstalledApps';

const AppsForUser = () => {
  //! State

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Box sx={{ mb: 8 }}>
        <ListInstalledApps />
      </CommonStyles.Box>
    </Fragment>
  );
};

export default React.memo(AppsForUser);
