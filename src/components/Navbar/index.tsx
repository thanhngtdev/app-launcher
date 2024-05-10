import CommonStyles from 'components/CommonStyles';
import LeftSide from './Components/LeftSide';
import CenterSide from './Components/CenterSide';
import RightSide from './Components/RightSide';
import { useTheme } from '@mui/material';

const Navbar = () => {
  const theme = useTheme();

  return (
    <CommonStyles.Box className='component:Navbar' component='header' sx={{ minHeight: 60 }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          py: 2,
          backgroundColor: theme.colors?.gray,
          borderBottom: `1px solid ${theme.colors?.border}`,
        }}
      >
        <LeftSide />
        <CenterSide />
        <RightSide />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Navbar;
