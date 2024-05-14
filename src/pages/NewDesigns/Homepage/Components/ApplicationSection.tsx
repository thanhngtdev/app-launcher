import { Dialog } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import EachApplication from 'components/EachApplication';
import AllApplicationDialog from 'pages/NewDesigns/AllApplication';
import React from 'react';
import ContentOfSection from './ContentOfSection';
import HeaderOfSection from './HeaderOfSection';

const ApplicationSection = () => {
  //! State
  const [open, setOpen] = React.useState(false);

  const applicationMock = [
    { label: 'Convey', href: '/' },
    { label: 'Atomic', href: '/' },
    { label: 'Quote', href: '/' },
    { label: 'Manage', href: '/' },
    { label: 'Reports', href: '/' },
    { label: 'Verify', href: '/' },
  ];

  //! Function
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //! Render
  return (
    <CommonStyles.Box className='component:ApplicationSection'>
      <HeaderOfSection
        title='Applications'
        subTitle={
          <CommonStyles.Typography className='is-hover' isLink onClick={handleClickOpen}>
            Show all products
          </CommonStyles.Typography>
        }
      />

      <ContentOfSection>
        {applicationMock.map((el) => {
          return <EachApplication key={el.label} application={el} />;
        })}
      </ContentOfSection>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AllApplicationDialog onClickClose={handleClose} />
      </Dialog>
    </CommonStyles.Box>
  );
};

export default React.memo(ApplicationSection);
