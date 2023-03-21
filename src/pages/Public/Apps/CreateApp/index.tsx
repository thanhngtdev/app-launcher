import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { a11yProps } from 'helpers';
import Tab1 from './Tabs/Tab1';
import { Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import { RequestCreateApp } from 'services/appManagementService';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateAppIntegration } from 'hooks/app/useAppHooks';
import BaseUrl from 'consts/baseUrl';

interface CreateAppProps {}

enum CreateAppTabs {
  Tab1 = 0,
  Tab2 = 1,
  Tab3 = 2,
}

const CreateApp = (props: CreateAppProps) => {
  //! State
  const theme = useTheme();
  const [value, setValue] = React.useState(CreateAppTabs.Tab1);
  const { mutateAsync: createAppIntegration } = useCreateAppIntegration();
  const navigate = useNavigate();

  const itemFound = {} as RequestCreateApp;
  const initialValues = {
    appType: itemFound?.appType || 0,
    loginRedirectUri: itemFound?.loginRedirectUri || '',
    logoutRedirectUri: itemFound?.logoutRedirectUri || '',
    scopes: itemFound?.scopes || '',
    name: itemFound?.name || '',
    icon: itemFound?.icon || '',
    supportEmail: itemFound?.supportEmail || '',
    phone: itemFound?.phone || '',
    homepage: itemFound?.homepage || '',
    launchUri: itemFound?.launchUri || '',
    termsConditionsUri: itemFound?.termsConditionsUri || '',
    privacyPolicyUri: itemFound?.privacyPolicyUri || '',
    summary: itemFound?.summary || '',
    description: itemFound?.description || '',
    isLive: itemFound?.isLive || false,
  };

  //! Function
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //! Render

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            await createAppIntegration(values);
            showSuccess('Add new Application successfully!');
            setSubmitting(false);
            navigate(BaseUrl.AppManagement);
          } catch (error) {
            setSubmitting(false);
            showError(error);
          }
        })();
      }}
    >
      {() => {
        return (
          <Form>
            <CommonStyles.Box sx={{ boxShadow: 2, p: 2, borderRadius: 1 }}>
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='App Information' {...a11yProps(value)} />
              </Tabs>
              {value === CreateAppTabs.Tab1 && <Tab1 value={value} />}
              {value === CreateAppTabs.Tab2 && <Tab1 value={value} />}
              {value === CreateAppTabs.Tab3 && <Tab1 value={value} />}

              <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CommonStyles.Button type='submit'>Create</CommonStyles.Button>
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(CreateApp);
