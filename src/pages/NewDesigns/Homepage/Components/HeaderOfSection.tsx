import React from 'react';
import CommonStyles from 'components/CommonStyles';

interface HeaderOfSectionProps {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
}

const HeaderOfSection = ({ title, subTitle }: HeaderOfSectionProps) => {
  return (
    <CommonStyles.Box
      className='component:HeaderOfSection'
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CommonStyles.Typography variant='h5' sx={{ fontWeight: 700 }}>
        {title}
      </CommonStyles.Typography>
      {subTitle}
    </CommonStyles.Box>
  );
};

export default HeaderOfSection;
