import React from 'react';
import { Badge } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import Avatar from 'components/CommonStyles/Avatar';
import { styled } from '@mui/material/styles';
import CommonIcons from 'components/CommonIcons';
import { SIZE_ICON_DEFAULT } from 'consts';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const RightSide = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:RightSide'
      sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
    >
      <CommonIcons.NotificationIcon className='is-hover' size={SIZE_ICON_DEFAULT} />
      <CommonIcons.HelpIcon className='is-hover' size={SIZE_ICON_DEFAULT + 3} />
      <CommonIcons.SettingsIcon className='is-hover' size={SIZE_ICON_DEFAULT} />

      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        color='success'
      >
        <Avatar sx={{ width: 35, height: 35 }} src='https://mui.com/static/images/avatar/1.jpg' />
      </StyledBadge>
    </CommonStyles.Box>
  );
};

export default React.memo(RightSide);
