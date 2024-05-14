import React, { PropsWithChildren } from 'react';
import CommonStyles from 'components/CommonStyles';

const ContentOfSection = (props: PropsWithChildren) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ContentOfSection'
      sx={{ mt: 5, display: 'flex', gap: 8, px: 4, flexWrap: 'wrap' }}
    >
      {props.children}
    </CommonStyles.Box>
  );
};

export default React.memo(ContentOfSection);
