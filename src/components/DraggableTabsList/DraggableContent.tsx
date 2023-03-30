import * as React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Tab as TabI } from 'providers/TabHandlerProvider';
import { useTheme } from '@mui/material';

const DraggableContent = React.memo(({ tab, currentTab }: { tab: TabI; currentTab: string }) => {
  const theme = useTheme();
  const isActiveTab = tab.value === currentTab;

  return (
    <CommonStyles.Box
      key={`${tab.value}`}
      sx={{
        [theme.breakpoints.down('sm')]: {
          paddingTop: 10,
        },
        height: isActiveTab ? '100%' : 0,
        visibility: isActiveTab ? 'visible' : 'hidden',
        overflow: isActiveTab ? '' : 'hidden',
      }}
    >
      {tab.content}
    </CommonStyles.Box>
  );
});

export default DraggableContent;
