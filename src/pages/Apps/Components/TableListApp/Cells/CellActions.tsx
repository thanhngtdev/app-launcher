import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from '../../../Dialogs/DialogAddOrEditApp';
import { App } from 'interfaces/apps';
import { useUpdateAppIntegration } from 'hooks/app/useAppHooks';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import DialogAssignUserToApp from 'pages/Apps/Dialogs/DialogAssignUserToApp';
import cachedService from 'services/cachedService';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { Badge } from '@mui/material';
import DialogListRequesting from 'pages/Apps/Dialogs/DialogListRequesting';

interface CellActionsProps {
  item: App;
}

const CellActions = ({ item }: CellActionsProps) => {
  //! State
  const {
    open: openEditApp,
    toggle: toggleEditApp,
    shouldRender: shouldRenderEditApp,
  } = useToggleDialog();

  const {
    open: openAssign,
    toggle: toggleAssign,
    shouldRender: shoulRenderAssign,
  } = useToggleDialog();

  const {
    open: openRequesting,
    toggle: toggleRequesting,
    shouldRender: shoulRenderRequesting,
  } = useToggleDialog();

  const { mutateAsync: updateApp } = useUpdateAppIntegration();
  const queryClient = useQueryClient();
  cachedService.setValue('app', item);

  //! Function

  //! Render
  return (
    <Fragment>
      {shouldRenderEditApp && (
        <DialogAddOrEditApp
          isOpen={openEditApp}
          toggle={toggleEditApp}
          item={item}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await updateApp({ id: item?.id || '', body: values });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppList],
                });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppDetail, item?.id],
                });
                showSuccess(`Update app ${item?.name} successfully!`);
                setSubmitting(false);
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
      )}

      {shoulRenderAssign && <DialogAssignUserToApp isOpen={openAssign} toggle={toggleAssign} />}

      {shoulRenderRequesting && (
        <DialogListRequesting isOpen={openRequesting} toggle={toggleRequesting} appId={item.id} />
      )}

      <CommonStyles.Tooltip title='Edit'>
        <Link to={BaseUrl.AppDetailWithID(item.id)}>
          <CommonStyles.Button isIconButton>
            <CommonIcons.EditIcon />
          </CommonStyles.Button>
        </Link>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Assign'>
        <CommonStyles.Button isIconButton onClick={toggleAssign}>
          <CommonIcons.AssignIcon />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Requesting App'>
        <CommonStyles.Button isIconButton onClick={toggleRequesting}>
          <Badge badgeContent={item?.requestCount || 0} color='error'>
            <CommonIcons.AssignmentChecked />
          </Badge>
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </Fragment>
  );
};

export default React.memo(CellActions);
