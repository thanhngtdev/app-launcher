import * as React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Tab, Tab as TabI } from 'providers/TabHandlerProvider';
import { useTheme } from '@mui/material';
import cachedService from 'services/cachedService';

const DraggableContent = React.memo(({ tab, currentTab }: { tab: TabI; currentTab: string }) => {
  const theme = useTheme();
  const isActiveTab = tab.value === currentTab;

  const listTab = cachedService.getValue('tabs') as Tab[];
  const contentFound = listTab.find((el) => el.value === tab.value)?.content;

  return (
    <CommonStyles.Box
      key={`${tab.value}`}
      sx={{
        [theme.breakpoints.down('sm')]: {
          paddingTop: 10,
        },
        height: isActiveTab ? '100%' : 0,
        visibility: isActiveTab ? 'visible' : 'hidden',
      }}
    >
      {contentFound}
    </CommonStyles.Box>
  );
});

export default DraggableContent;
