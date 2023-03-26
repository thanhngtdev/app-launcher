import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useCreateAppIntegration } from 'hooks/app/useAppHooks';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from './Dialogs/DialogAddOrEditApp';
import { showError, showSuccess } from 'helpers/toast';
import { queryKeys } from 'consts';
import { useQueryClient } from '@tanstack/react-query';
import TableListApp from './Components/TableListApp';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import AppsForUser from './AppsForUser';

const AppManagement = () => {
  //! State
  const { isUser } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: createAppIntegration } = useCreateAppIntegration();

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
      {shouldRenderAddApp && (
        <DialogAddOrEditApp
          isOpen={openAddApp}
          toggle={toggleAddApp}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await createAppIntegration(values);
                showSuccess('Add new Application successfully!');
                await queryClient.refetchQueries([queryKeys.getAppList]);
                setSubmitting(false);
                toggleAddApp();
              } catch (error) {
                setSubmitting(false);
                showError(error);
              }
            })();
          }}
        />
      )}

      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={BaseUrl.CreateApp}>
          <CommonStyles.Button startIcon={<CommonIcons.InboxIcon />}>
            Add new Application
          </CommonStyles.Button>
        </Link>
      </CommonStyles.Box>

      <TableListApp />
    </CommonStyles.Box>
  );
};

export default React.memo(AppManagement);
