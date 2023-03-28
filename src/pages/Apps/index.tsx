import { useAuth } from 'providers/AuthenticationProvider';
import AppsForUser from './AppsForUser';
import AppsForManager from './AppsForManager';
import { useTabHandler } from 'providers/TabHandlerProvider';
import useRootNonePadding from 'hooks/useRootNonePadding';
import DraggableTabsList from 'components/DraggableTabsList';

const AppManagement = () => {
  //! State
  const { isUser } = useAuth();
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

  if (isUser) {
    return <AppsForUser />;
  }

  return <AppsForManager />;
};

export default AppManagement;
