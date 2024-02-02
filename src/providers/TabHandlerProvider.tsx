import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cloneDeep, isString, uniqBy } from 'lodash';
import DefaultApps from 'components/DefaultApps';
import cachedService from 'services/cachedService';

export interface Tab {
  id: string;
  label: string;
  value: string;
  content: any;
  prenventClose?: boolean;
}

export const TAB_KEY = 'tabs';

export type AddNewTab = Pick<Tab, 'label' | 'content' | 'value'> & {
  openNewTab?: boolean;
};

interface TabHandlerContextI {
  tabs: Tab[];
  currentTab: string;
  onDragEnd: (result: any) => void;
  onCloseTab: (index: string | number) => void;
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

export const defaultAppsTab = [
  {
    id: '1',
    label: 'Apps',
    value: '0',
    content: <DefaultApps />,
    prenventClose: true,
  },
];

cachedService.setValue(TAB_KEY, defaultAppsTab);

const TabHandlerProvider = ({ children }: { children: any }) => {
  //! State
  const [currentTab, setTab] = useState('0');
  const [tabs, setTabs] = useState<Tab[]>(defaultAppsTab);

  //! Function
  const onDragEnd = useCallback((result: any) => {
    if (result?.destination) {
      setTabs((prevTabs) => {
        const newTabs = cloneDeep(prevTabs);
        const draggedTab = newTabs.splice(result.source.index, 1)[0];
        newTabs.splice(result.destination.index, 0, draggedTab);
        return newTabs;
      });
    }
  }, []);

  const onCloseTab = useCallback((index: string | number) => {
    //* If index is value / appId / string / ...
    if (isString(index) && index !== '') {
      const valueArg = index;

      setTabs((prevTabs) => {
        const newTabs = cloneDeep(prevTabs);
        const indexFound = newTabs.findIndex((el) => el.value === valueArg);

        setTab((prevCurrentTab) => {
          //* If close itself
          if (`${valueArg}` === `${prevCurrentTab}`) {
            return newTabs[indexFound - 1].value;
          }

          return prevCurrentTab;
        });

        const result = newTabs.filter((el, indexNext) => indexFound !== indexNext);
        cachedService.setValue(TAB_KEY, result);

        return result;
      });
      return;
    }

    setTabs((prevTabs) => {
      const newTabs = cloneDeep(prevTabs);

      setTab((prevCurrentTab) => {
        //* If close itself
        const indexCurrentValue = newTabs.findIndex((el) => el.value === prevCurrentTab);
        if (`${indexCurrentValue}` === `${index}`) {
          return newTabs[indexCurrentValue - 1].value;
        }

        return prevCurrentTab;
      });

      return newTabs.filter((el, indexNext) => index !== indexNext);
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
      cachedService.setValue(
        TAB_KEY,
        uniqBy(
          [
            ...prevTabs,
            {
              id,
              label,
              value,
              content,
            },
          ],
          'value'
        )
      );

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
