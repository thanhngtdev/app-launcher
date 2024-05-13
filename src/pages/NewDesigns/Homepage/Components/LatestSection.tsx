import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import EachLatestSection from 'components/EachLatestSection';
import { SIZE_ICON_DEFAULT } from 'consts';
import React from 'react';
import ContentOfSectionHorizontal from './ContentOfSectionHorizontal';
import HeaderOfSection from './HeaderOfSection';

const LatestSection = () => {
  //! State

  const SectionMock = [
    { title: 'Convey', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Atomic', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Quote', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Manage', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Reports', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Verify', subTitle: 'We have update Cases and the way we handle them', href: '/' },
  ];

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
      <ContentOfSectionHorizontal>
        {SectionMock.map((el, ind) => {
          return <EachLatestSection application={el} key={ind} />;
        })}
        <CommonStyles.Box sx={{ alignContent: 'center' }}>
          <CommonIcons.IoArrowForwardOutline size={SIZE_ICON_DEFAULT + 20} />
          <CommonStyles.Typography sx={{ fontSize: 14 }}>Load more</CommonStyles.Typography>
        </CommonStyles.Box>
      </ContentOfSectionHorizontal>
    </CommonStyles.Box>
  );
};

export default React.memo(LatestSection);
