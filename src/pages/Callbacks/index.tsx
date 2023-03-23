import React from 'react';
import CommonStyles from 'components/CommonStyles';

const Callbacks = () => {
  //! State

  //! Function

  //! Render

  return (
    <CommonStyles.Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
      <CommonStyles.Loading size={24} /> Logging in...
    </CommonStyles.Box>
  );
};

export default React.memo(Callbacks);
