import React, { useEffect } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

const Logout = () => {
  //! State
  const navigate = useNavigate();

  //! Function
  useEffect(() => {
    navigate(BaseUrl.Login);
  }, []);

  //! Render
  return (
    <CommonStyles.Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
      <CommonStyles.Loading size={24} /> Logging out...
    </CommonStyles.Box>
  );
};

export default React.memo(Logout);
