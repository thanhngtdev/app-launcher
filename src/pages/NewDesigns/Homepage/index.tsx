import CommonStyles from 'components/CommonStyles';
import ApplicationSection from './Components/ApplicationSection';
import LatestSection from './Components/LatestSection';
import RecentActivity from './Components/RecentActivity';

const Apps = () => {
  return (
    <CommonStyles.Box
      className='component:Apps'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <ApplicationSection />
      <LatestSection />
      <RecentActivity />
    </CommonStyles.Box>
  );
};

export default Apps;
