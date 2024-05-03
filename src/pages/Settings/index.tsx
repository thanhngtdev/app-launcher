import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Formik, Form } from 'formik';
import { Tab, Tabs } from '@mui/material';
import { a11yProps } from 'helpers';
import { showError, showSuccess } from 'helpers/toast';
import TabInformation from './Tabs/TabInformation';
import { useAuth } from 'providers/AuthenticationProvider';
import { useUpdateUserInfo } from 'hooks/users/useUsersHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import ConfigAppLauncher from './ConfigAppLauncher';

enum TabSettings {
  Tab1 = 0,
  Tab2 = 1,
  Tab3 = 2,
}

const Settings = () => {
  //! State
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState(TabSettings.Tab1);
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();

  //! Function
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={{
          firstname: user?.firstname || '',
          lastname: user?.lastname || '',
          company: user?.company || '',
          address: user?.address || '',
          phoneNumber: user?.phoneNumber || '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              setSubmitting(true);
              await updateUserInfo(values);
              await queryClient.refetchQueries({ queryKey: [queryKeys.getUserInfo] });
              showSuccess('Update successfully!');
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box sx={{ boxShadow: 2, p: 2, borderRadius: 1 }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                  <Tab label='Information' {...a11yProps(value)} />
                </Tabs>
                {value === TabSettings.Tab1 && <TabInformation value={value} />}

                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CommonStyles.Button
                    type='submit'
                    loading={isSubmitting}
                    startIcon={<CommonIcons.SaveIcon />}
                  >
                    Save
                  </CommonStyles.Button>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>

      {isAdmin && <ConfigAppLauncher />}
    </Fragment>
  );
};

export default React.memo(Settings);
