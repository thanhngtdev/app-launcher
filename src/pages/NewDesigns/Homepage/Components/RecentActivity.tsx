import React from 'react';
import CommonStyles from 'components/CommonStyles';
import HeadEachSection from './HeaderOfSection';
import ContentOfSection from './ContentOfSection';

const RecentActivity = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:RecentActivity'>
      <HeadEachSection title='Recent Activity' />
      <ContentOfSection>Content</ContentOfSection>
    </CommonStyles.Box>
  );
};

export default React.memo(RecentActivity);
