import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import React from 'react';

interface EachLatestSectionProps {
  application: {
    title?: string | React.ReactNode;
    subTitle?: string | React.ReactNode;
    icon?: string | React.ReactNode;
  };
}

const EachLatestSection = ({ application }: EachLatestSectionProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='each-application'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.825rem',
        '& .each-application__overlay': {
          opacity: 0,
        },
        '&:hover': {
          cursor: 'pointer',
          '.each-application__overlay': {
            opacity: 1,
          },
        },
      }}
    >
      <CommonStyles.Box
        className='each-application__logo'
        sx={{
          width: 350,
          height: 170,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          overflow: 'hidden',
          padding: '12px 16px 12px 16px',
        }}
      >
        {/* <CommonStyles.Box
          className='each-application__overlay'
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            transition: '.3s',
          }}
        /> */}
        <CommonStyles.Box
          sx={{
            width: '46px',
            height: '46px',
            borderRadius: '46px',
            border: `1px solid ${theme.colors?.borderIcon}`,
            position: 'relative',
          }}
        >
          <CommonIcons.IoHeartOutline
            size={SIZE_ICON_DEFAULT - 4}
            style={{ position: 'absolute', right: '12px', top: '14px' }}
          />
        </CommonStyles.Box>
        <CommonStyles.Typography variant='h6' sx={{ fontWeight: '600' }}>
          {application.title}
        </CommonStyles.Typography>
        <CommonStyles.Typography
          sx={{ pr: 3, paddingTop: '8px', flexShrink: 1, fontWeight: '300', fontSize: 14 }}
        >
          {application.subTitle}
        </CommonStyles.Typography>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default EachLatestSection;
