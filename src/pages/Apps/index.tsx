import { useTabHandler } from 'providers/TabHandlerProvider';
import useRootNonePadding from 'hooks/useRootNonePadding';
import DraggableTabsList from 'components/DraggableTabsList';

const AppManagement = () => {
  //! State
  const { currentTab, tabs, handleChangeTab, onDragEnd, onCloseTab } = useTabHandler();

  useRootNonePadding();

  //! Function

  //! Render
  return (
    <DraggableTabsList
      currentTab={currentTab}
      tabs={tabs}
      onDragEnd={onDragEnd}
      onCloseTab={onCloseTab}
      handleChange={handleChangeTab}
    />
  );
};

export default AppManagement;
