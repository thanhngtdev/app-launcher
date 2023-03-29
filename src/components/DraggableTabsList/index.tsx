import * as React from 'react';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import DraggableTab from './DraggableTab';
import { useTheme } from '@mui/material';
import { Tab as TabI } from 'providers/TabHandlerProvider';
import TabLabel from './TabLabel';
import DraggableContent from './DraggableContent';

interface DraggableTabsListProps {
  tabs: TabI[];
  currentTab: string;
  handleChange: (event: React.SyntheticEvent<Element, Event>, newValue: any) => void;
  onDragEnd: (result: any) => void;
  onCloseTab: (index: number) => void;
}

function DraggableTabsList(props: DraggableTabsListProps) {
  //! State
  const theme = useTheme();

  const _renderTabList = (droppableProvided: DroppableProvided) => (
    <TabList onChange={props.handleChange} aria-label='Draggable Tabs' variant='scrollable'>
      {props.tabs.map((tab, index) => {
        const isClose = !tab.prenventClose;
        const isActive = tab.value === props.currentTab;

        const child = (
          <Tab
            label={tab.label}
            value={tab.value}
            sx={{
              color: `${theme.colors?.white} !important`,
              transition: '0.3s',
              textTransform: 'none !important',
              background: isActive ? '#323639' : '',
            }}
            key={index}
          />
        );

        return (
          <DraggableTab
            label={
              <TabLabel
                label={tab.label}
                isHideBorder={true}
                onCloseTab={(e) => {
                  e.stopPropagation();
                  props.onCloseTab(index);
                }}
                isClose={isClose}
                isActive={isActive}
              />
            }
            value={tab.value}
            index={index}
            key={index}
            child={child}
          />
        );
      })}
      {droppableProvided ? droppableProvided.placeholder : null}
    </TabList>
  );

  const _renderTabListWrappedInDroppable = () => (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <div style={{ display: 'flex', overflow: 'auto' }}>
        <Droppable droppableId='1' direction='horizontal'>
          {(droppableProvided: DroppableProvided) => (
            <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {_renderTabList(droppableProvided)}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={props.currentTab}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            top: 0,
            position: 'sticky',
            zIndex: 999,

            //* Hide indicator
            '& .MuiTabs-indicator': {
              height: 0,
            },
          }}
        >
          <Stack direction='column'>{_renderTabListWrappedInDroppable()}</Stack>
        </Box>
        {props.tabs.map((tab) => {
          return <DraggableContent key={`${tab.value}`} tab={tab} currentTab={props.currentTab} />;
        })}
      </TabContext>
    </Box>
  );
}

export default DraggableTabsList;
