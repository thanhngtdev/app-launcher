import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { UserInfo } from 'interfaces/user';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogUpdateUser from '../Dialogs/DialogUpdateUser';
import { useAssignUser, useUpdateUser } from 'hooks/users/useUsersHooks';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import DialogAssignUser from '../Dialogs/DialogAssignUser';
import { getNameRole } from 'helpers';

interface CellActionsProps {
  user: UserInfo;
}

const CellActions = ({ user }: CellActionsProps) => {
  //! State
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: assignUser } = useAssignUser();

  const {
    open: openUpdateUser,
    toggle: toggleUpdateUser,
    shouldRender: shouldRenderUpdateUser,
  } = useToggleDialog();

  const {
    open: openAssignUser,
    toggle: toggleAssignUser,
    shouldRender: shouldRenderAssignUser,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      {shouldRenderAssignUser && (
        <DialogAssignUser
          isOpen={openAssignUser}
          toggle={toggleAssignUser}
          user={user}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await assignUser({
                  username: values.username,
                  role: values.role,
                });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getListUser],
                });
                setSubmitting(false);
                showSuccess(
                  `Assign [${user?.username}] to ${getNameRole(values.role)} App successfully!`
                );
                toggleAssignUser();
              } catch (error) {
                console.log('dqoiwdjqwd', error);
                showError(error);
                setSubmitting(false);
              }
            })();
          }}
        />
      )}

      {shouldRenderUpdateUser && (
        <DialogUpdateUser
          isOpen={openUpdateUser}
          toggle={toggleUpdateUser}
          user={user}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await updateUser({ username: user.username, body: values });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getListUser],
                });
                setSubmitting(false);
                showSuccess(`Update ${user?.username} successfully!`);
                toggleUpdateUser();
              } catch (error) {
                showError(error);
                setSubmitting(false);
              }
            })();
          }}
        />
      )}
      <CommonStyles.Tooltip title='Edit'>
        <CommonStyles.Button isIconButton onClick={toggleUpdateUser}>
          <CommonIcons.EditIcon />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Assign'>
        <CommonStyles.Button isIconButton onClick={toggleAssignUser}>
          <CommonIcons.AssignIcon />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </CommonStyles.Box>
  );
};

export default CellActions;
