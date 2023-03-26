import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogI } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import TabAssignManager from './Tabs/TabAssignManager';
import TabAssignUser from './Tabs/TabAssignUser';
import { useAuth } from 'providers/AuthenticationProvider';
import { useMemo } from 'react';

interface Props extends DialogI<{ username: string }> {}

const DialogAssignUserToApp = (props: Props) => {
  const { isAppManager } = useAuth();
  const { isOpen, toggle } = props;

  const tabs = useMemo(() => {
    if (isAppManager) {
      return [
        {
          label: 'Assign user',
          component: TabAssignUser,
        },
      ];
    }

    return [
      {
        label: 'Assign manager',
        component: TabAssignManager,
      },
      {
        label: 'Assign user',
        component: TabAssignUser,
      },
    ];
  }, [isAppManager]);

  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='xl'>
      <DialogContent>
        <CommonStyles.Tabs tabs={tabs} />
      </DialogContent>
      <DialogActions>
        <CommonStyles.Button variant='text' onClick={toggle}>
          Cancel
        </CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default DialogAssignUserToApp;
