import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import {
  useCreateAppIntegration,
  useGetListApp,
  useGetListInstalledApp,
} from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from './Dialogs/DialogAddOrEditApp';
import { showError, showSuccess } from 'helpers/toast';
import CellActions from './Components/TableListApp/Cells/CellActions';
import { queryKeys } from 'consts';
import { useQueryClient } from '@tanstack/react-query';
import { Divider } from '@mui/material';
import TableListApp from './Components/TableListApp';
import TableInstalledApp from './Components/TableInstalledApp';

interface AppsProps {}

const AppManagement = (props: AppsProps) => {
  //! State
  const {
    filters,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler({ search: '' });

  const queryClient = useQueryClient();
  const { data: resListApp, isLoading } = useGetListApp({
    skip: page,
    take: rowsPerPage,
    filter: filters?.search,
  });
  const data = resListApp?.data?.items || [];
  const totalCount = resListApp?.data?.totalCount || 0;

  const { data: resListInstalledApp, isLoading: isInstalledLoading } = useGetListInstalledApp({
    skip: page,
    take: rowsPerPage,
    filter: filters?.search,
  });
  const dataInstallApp = resListInstalledApp?.data?.items || [];
  const totalCountInstallApp = resListInstalledApp?.data?.totalCount || 0;

  const { mutateAsync: createAppIntegration } = useCreateAppIntegration();

  const {
    open: openAddApp,
    toggle: toggleAddApp,
    shouldRender: shouldRenderAddApp,
  } = useToggleDialog();

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
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
        <CommonStyles.Button onClick={toggleAddApp}>
          <CommonIcons.InboxIcon sx={{ mr: 1 }} /> Add new Application
        </CommonStyles.Button>
      </CommonStyles.Box>

      <TableListApp />

      <CommonStyles.Box sx={{ mt: 4 }}>
        <TableInstalledApp />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(AppManagement);
