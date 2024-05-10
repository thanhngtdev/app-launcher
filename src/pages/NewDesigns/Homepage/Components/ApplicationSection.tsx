import React from 'react';
import CommonStyles from 'components/CommonStyles';
import EachApplication from 'components/EachApplication';
import HeaderOfSection from './HeaderOfSection';
import ContentOfSection from './ContentOfSection';

const ApplicationSection = () => {
  //! State
  const applicationMock = [
    { label: 'Convey', href: '/' },
    { label: 'Atomic', href: '/' },
    { label: 'Quote', href: '/' },
    { label: 'Manage', href: '/' },
    { label: 'Reports', href: '/' },
    { label: 'Verify', href: '/' },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:ApplicationSection'>
      <HeaderOfSection
        title='Applications'
        subTitle={
          <CommonStyles.Typography className='is-hover' isLink>
            Show all products
          </CommonStyles.Typography>
        }
      />

      <ContentOfSection>
        {applicationMock.map((el) => {
          return <EachApplication key={el.label} application={el} />;
        })}
      </ContentOfSection>
    </CommonStyles.Box>
  );
};

export default React.memo(ApplicationSection);
