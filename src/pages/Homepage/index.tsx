import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useAuth } from 'providers/AuthenticationProvider';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';
import { Link } from 'react-router-dom';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogOptionCreateApp from 'pages/Apps/Dialogs/DialogOptionCreateApp';
import DialogCreateApp from 'pages/Apps/Dialogs/DialogCreateApp';

// interface AppsProps {}

const Apps = () => {
  //! State
  const { isUser, user } = useAuth();
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
  if (isUser) {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
          Hello {user?.username}
        </CommonStyles.Typography>
        <Link to={BaseUrl.AppManagement}>
          <CommonStyles.Button> Go to Apps</CommonStyles.Button>
        </Link>
      </CommonStyles.Box>
    );
  }

  return (
    <CommonStyles.Box>
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
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h4' sx={{ mb: 1 }}>
          Hello {user?.username}
        </CommonStyles.Typography>
      </CommonStyles.Box>

      <CommonStyles.Button
        sx={{ mt: 2 }}
        startIcon={<CommonIcons.AddIcon />}
        onClick={toggleOptionCreateApp}
      >
        CREATE APP
      </CommonStyles.Button>
    </CommonStyles.Box>
  );
};

export default React.memo(Apps);
