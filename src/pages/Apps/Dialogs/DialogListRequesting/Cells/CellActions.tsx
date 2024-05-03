import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { UserRequestingApp } from 'interfaces/user';
import { showError, showSuccess } from 'helpers/toast';
import { useRequestApproval } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';

interface CellActionsProps {
  item: UserRequestingApp;
}

const CellActions = ({ item }: CellActionsProps) => {
  //! State
  const queryClient = useQueryClient();
  const { mutateAsync: approve, isLoading: isApproving } = useRequestApproval();
  const { mutateAsync: deny, isLoading: isDenying } = useRequestApproval();

  //! Function
  const onClickApproval = async () => {
    try {
      await approve({ isApproved: true, requestId: item.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppRequesting] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });
      showSuccess(`Approved [${item.username}] successfully!`);
    } catch (error) {
      showError(error);
    }
  };

  const onClickDenied = async () => {
    try {
      await deny({ isApproved: false, requestId: item.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppRequesting] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });
      showSuccess(`Deny [${item.username}] successfully!`);
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Tooltip title='Approve'>
        <CommonStyles.Button loading={isApproving} isIconButton onClick={onClickApproval}>
          <CommonIcons.CheckedAndAdd />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Deny'>
        <CommonStyles.Button loading={isDenying} isIconButton onClick={onClickDenied}>
          <CommonIcons.DenyAccess />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </CommonStyles.Box>
  );
};

export default React.memo(CellActions);
