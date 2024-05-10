import React from 'react';
import CommonStyles from 'components/CommonStyles';
import HeaderOfSection from './HeaderOfSection';
import ContentOfSection from './ContentOfSection';

const LatestSection = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:LatestSection'>
      <HeaderOfSection
        title='Latest'
        subTitle={
          <CommonStyles.Typography className='is-hover' isLink>
            Subscribe
          </CommonStyles.Typography>
        }
      />
      <ContentOfSection>Content</ContentOfSection>
    </CommonStyles.Box>
  );
};

export default React.memo(LatestSection);
