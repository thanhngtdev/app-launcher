import * as React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Tab as TabI } from 'providers/TabHandlerProvider';

const DraggableContent = React.memo(({ tab, currentTab }: { tab: TabI; currentTab: string }) => {
  return (
    <CommonStyles.Box key={`${tab.value}`} sx={{ display: tab.value === currentTab ? '' : 'none' }}>
      {tab.content}
    </CommonStyles.Box>
  );
});

export default DraggableContent;
