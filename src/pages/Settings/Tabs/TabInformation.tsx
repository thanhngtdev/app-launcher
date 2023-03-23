import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useAuth } from 'providers/AuthenticationProvider';

interface TabInformationProps {
  value: number;
}

const TabInformation = ({ value }: TabInformationProps) => {
  //! State
  const { user } = useAuth();

  //! Function

  //! Render

  return (
    <CommonStyles.TabPanel value={value} index={value}>
      <CommonStyles.Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
        <CommonStyles.Avatar sx={{ width: 70, height: 70 }} />
        <CommonStyles.Box>
          <CommonStyles.Typography variant='caption'>Username</CommonStyles.Typography>
          <CommonStyles.Typography variant='h5'>{user?.username}</CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'flex', gap: 3, '& > div': { mb: 2 } }}>
          <FastField name='firstname' label='First name' component={TextField} fullWidth />
          <FastField name='lastname' label='Last name' component={TextField} fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'flex', gap: 3, '& > div': { mb: 2 } }}>
          <FastField name='company' label='Company' component={TextField} fullWidth />
          <FastField name='address' label='Address' component={TextField} fullWidth />
          <FastField name='phoneNumber' label='Phone number' component={TextField} fullWidth />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.TabPanel>
  );
};

export default React.memo(TabInformation);
