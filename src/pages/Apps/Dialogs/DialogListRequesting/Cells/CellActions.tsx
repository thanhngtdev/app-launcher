import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { UserRequestingApp } from 'interfaces/user';
import { showError } from 'helpers/toast';
import { useRequestApproval } from 'hooks/app/useAppHooks';

interface CellActionsProps {
  item: UserRequestingApp;
}

const CellActions = ({ item }: CellActionsProps) => {
  //! State
  const { mutateAsync: requestApproval, isLoading } = useRequestApproval();

  //! Function
  const onClickApproval = async () => {
    try {
      await requestApproval({ isApproved: true, requestId: item.id });
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Button loading={isLoading} isIconButton onClick={onClickApproval}>
        <CommonIcons.CheckedAndAdd />
      </CommonStyles.Button>
    </CommonStyles.Box>
  );
};

export default React.memo(CellActions);
