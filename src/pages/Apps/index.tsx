import React from 'react';
import { useAuth } from 'providers/AuthenticationProvider';
import AppsForUser from './AppsForUser';
import AppsForManager from './AppsForManager';

const AppManagement = () => {
  //! State
  const { isUser } = useAuth();

  //! Function

  //! Render
  if (isUser) {
    return <AppsForUser />;
  }

  return <AppsForManager />;
};

export default React.memo(AppManagement);
