import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import cachedService from 'services/cachedService';
import { App } from 'interfaces/apps';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { UserInfo } from 'interfaces/user';
import userService from 'services/userService';
import { useQueryClient } from '@tanstack/react-query';

const CellActions = React.memo(({ user }: { user: UserInfo }) => {
  const app = cachedService.getValue('app') as App;
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);

  const role = user?.roles?.[0];

  if (!role) {
    return <div />;
  }

  return (
    <CommonStyles.Button
      isIconButton
      loading={isLoading}
      onClick={async () => {
        try {
          setLoading(true);
          await userService.unAssignUser({
            username: user?.username || '',
            role: role || '',
            appId: app.id,
          });

          await queryClient.refetchQueries({
            queryKey: [queryKeys.getListUser],
          });
          showSuccess(`Unassign ${user.username} successfully!`);
          setLoading(false);
        } catch (error) {
          showError(error);
          setLoading(false);
        }
      }}
    >
      {isLoading ? <CommonStyles.Loading /> : <CommonIcons.UnAssignIcon />}
    </CommonStyles.Button>
  );
});

export default CellActions;
