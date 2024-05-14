import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import ContentOfSection from './Components/ContentOfSection';
import EachApplication from 'components/EachApplication';
import { SIZE_ICON_DEFAULT } from 'consts';

interface AllApplicationProps {
  onClickClose: () => void;
}

const AllApplicationDialog = (props: AllApplicationProps) => {
  const { onClickClose } = props;
  //! State
  const applicationMock = [
    { label: 'Convey', href: '/' },
    { label: 'Atomic', href: '/' },
    { label: 'Quote', href: '/' },
    { label: 'Manage', href: '/' },
    { label: 'Reports', href: '/' },
    { label: 'Verify', href: '/' },
    { label: 'Verify', href: '/' },
    { label: 'Verify', href: '/' },
    { label: 'Verify', href: '/' },
    { label: 'Verify', href: '/' },
    { label: 'Verify', href: '/' },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ mx: 10, mt: 4 }}>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommonStyles.Typography fontWeight={600} fontSize='1.2rem'>
          All application
        </CommonStyles.Typography>
        <CommonIcons.IoClose
          style={{ cursor: 'pointer' }}
          size={SIZE_ICON_DEFAULT}
          onClick={onClickClose}
        />
      </CommonStyles.Box>
      <ContentOfSection>
        {applicationMock.map((el) => {
          return <EachApplication key={el.label} application={el} />;
        })}
      </ContentOfSection>
    </CommonStyles.Box>
  );
};

export default AllApplicationDialog;
