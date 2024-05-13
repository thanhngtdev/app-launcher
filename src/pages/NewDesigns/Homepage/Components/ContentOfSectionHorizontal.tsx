import React, { PropsWithChildren } from 'react';
import CommonStyles from 'components/CommonStyles';

const ContentOfSectionHorizontal = (props: PropsWithChildren) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ContentOfSectionHorizontal'
      sx={{
        p: 1,
        mt: 5,
        display: 'flex',
        gap: 4,
        px: 4,
        flexWrap: 'nowrap',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        paddingLeft: 'calc(calc(100vw - 100%)*0.6)',
      }}
    >
      {props.children}
    </CommonStyles.Box>
  );
};

export default React.memo(ContentOfSectionHorizontal);
