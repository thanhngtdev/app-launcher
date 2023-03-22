import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import ListAvailableApps from './ListAvailableApps';
import ListInstalledApps from './ListInstalledApps';

interface AppsForUserProps {}

const AppsForUser = (props: AppsForUserProps) => {
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
