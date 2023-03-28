import CommonStyles from 'components/CommonStyles';
import ListInstalledApps from 'components/ListInstalledApps';
import { cloneDeep } from 'lodash';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  value: string;
  content: any;
  prenventClose?: boolean;
}

export type AddNewTab = Pick<Tab, 'label' | 'content' | 'value'> & {
  openNewTab?: boolean;
};

interface TabHandlerContextI {
  tabs: Tab[];
  currentTab: string;
  onDragEnd: (result: any) => void;
  onCloseTab: (index: number) => void;
  addNewTab: (tab: AddNewTab) => void;
  handleChangeTab: (event: React.SyntheticEvent<Element, Event>, newValue: any) => void;
  setInitialTabs: (newTabs: any[]) => void;
}

const TabHandlerContext = createContext<TabHandlerContextI>({
  currentTab: '0',
  tabs: [],
  onCloseTab: () => {},
  onDragEnd: () => {},
  addNewTab: () => {},
  handleChangeTab: () => {},
  setInitialTabs: () => {},
});

export const useTabHandler = () => useContext(TabHandlerContext);

const DefaultApps = () => {
  return (
    <CommonStyles.Box sx={{ p: 2 }}>
      <ListInstalledApps />
    </CommonStyles.Box>
  );
};

const TabHandlerProvider = ({ children }: { children: any }) => {
  //! State
  const [currentTab, setTab] = useState('0');
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      label: 'Apps',
      value: '0',
      content: <DefaultApps />,
      prenventClose: true,
    },
  ]);

  //! Function
  const onDragEnd = useCallback((result: any) => {
    setTabs((prevTabs) => {
      const newTabs = cloneDeep(prevTabs);
      const draggedTab = newTabs.splice(result.source.index, 1)[0];
      newTabs.splice(result.destination.index, 0, draggedTab);
      return newTabs;
    });
  }, []);

  const onCloseTab = useCallback((index: number) => {
    setTabs((prevTabs) => {
      const newTabs = cloneDeep(prevTabs);
      setTab((prevCurrentTab) => {
        //* If close itself
        const indexCurrentValue = prevTabs.findIndex((el) => el.value === prevCurrentTab);
        if (`${indexCurrentValue}` === `${index}`) {
          return prevTabs[indexCurrentValue - 1].value;
        }

        return prevCurrentTab;
      });

      newTabs.splice(index, 1);
      return newTabs;
    });
  }, []);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      setTab(newValue);
    },
    []
  );

  const addNewTab = useCallback(({ label, value, content, openNewTab }: AddNewTab) => {
    if (openNewTab) {
      setTab(value);
    }

    setTabs((prevTabs) => {
      //* If this tab is opened
      if (prevTabs.map((el) => el.value).includes(value)) {
        setTab(value);

        return prevTabs;
      }

      const id = `${prevTabs.length + 1}`;
      return [
        ...prevTabs,
        {
          id,
          label,
          value,
          content,
        },
      ];
    });
  }, []);

  const setInitialTabs = useCallback((tabs: Tab[]) => {
    setTabs(tabs);
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      currentTab,
      tabs,
      onDragEnd,
      handleChangeTab,
      onCloseTab,
      setInitialTabs,
      addNewTab,
    };
  }, [currentTab, tabs, onDragEnd, setInitialTabs, addNewTab]);

  return <TabHandlerContext.Provider value={value}>{children}</TabHandlerContext.Provider>;
};

export default TabHandlerProvider;
