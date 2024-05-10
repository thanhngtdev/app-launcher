import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';

const LeftSide = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:LeftSide' sx={{ display: 'flex', gap: 3 }}>
      <CommonIcons.AppsIcon className='is-hover' size={SIZE_ICON_DEFAULT} />
    </CommonStyles.Box>
  );
};

export default React.memo(LeftSide);
