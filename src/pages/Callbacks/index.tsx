import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useAuth } from 'providers/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

const Callbacks = () => {
  //! State
  const auth = useAuth();
  const navigate = useNavigate();

  //! Function

  React.useEffect(() => {
    auth.loginCallback().then(() => {
      navigate(BaseUrl.Homepage);
    });
  }, []);

  //! Render
  return (
    <CommonStyles.Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
      <CommonStyles.Loading size={24} /> Logging in...
    </CommonStyles.Box>
  );
};

export default React.memo(Callbacks);
