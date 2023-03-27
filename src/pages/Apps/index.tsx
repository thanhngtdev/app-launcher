import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import TableListApp from './Components/TableListApp';
import { useAuth } from 'providers/AuthenticationProvider';
import AppsForUser from './AppsForUser';
import DialogCreateApp from './Dialogs/DialogCreateApp';
import ListInstalledApps from './AppsForUser/ListInstalledApps';

const AppManagement = () => {
  //! State
  const { isUser, isAppManager } = useAuth();

  const {
    open: openAddApp,
    toggle: toggleAddApp,
    shouldRender: shouldRenderAddApp,
  } = useToggleDialog();

  //! Function

  //! Render
  if (isUser) {
    return <AppsForUser />;
  }

  return (
    <CommonStyles.Box>
      {shouldRenderAddApp && <DialogCreateApp isOpen={openAddApp} toggle={toggleAddApp} />}

      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CommonStyles.Button startIcon={<CommonIcons.InboxIcon />} onClick={toggleAddApp}>
          Add new Application
        </CommonStyles.Button>
      </CommonStyles.Box>

      <TableListApp />

      {isAppManager && (
        <Fragment>
          <CommonStyles.Box sx={{ mt: 10, mb: 10 }}>
            <ListInstalledApps />
          </CommonStyles.Box>
        </Fragment>
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(AppManagement);
