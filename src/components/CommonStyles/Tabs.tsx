import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import TabsMui from '@mui/material/Tabs';
import TabMui from '@mui/material/Tab';
import { a11yProps } from 'helpers';

interface TabsProps {
  defaultTab?: number;
  tabs: { label: string; component: any }[];
  onChangeTab?: (tab: number) => void;
}

const Tabs = ({ tabs, defaultTab = 0, onChangeTab }: TabsProps) => {
  //! State
  const [value, setValue] = useState(defaultTab);

  //! Function
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChangeTab && onChangeTab(newValue);
  };

  //! Render
  return (
    <CommonStyles.Box>
      <TabsMui value={value} onChange={handleChange} aria-label='basic tabs example'>
        {tabs.map((tab, index) => (
          <TabMui key={tab.label} label={tab.label} {...a11yProps(index)} />
        ))}
      </TabsMui>
      <CommonStyles.Box sx={{ pt: 2 }}>
        {tabs.map((tab, index) => {
          if (index === value) {
            return <tab.component key={tab.label} />;
          }

          return null;
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Tabs);
