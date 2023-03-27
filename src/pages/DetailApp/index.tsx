import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import TabInformation from './Tabs/TabInformation';
import { Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useGetAppIntegrationDetail, useUpdateAppIntegration } from 'hooks/app/useAppHooks';
import * as Yup from 'yup';
import cachedService from 'services/cachedService';
import TabAuthentication from './Tabs/TabAuthentication';

const validateUpdateApp = Yup.object().shape({
  appType: Yup.string().required('App type is required field!'),
  loginRedirectUri: Yup.string().required('Login Redirect URL is required field!'),
  logoutRedirectUri: Yup.string().required('Logout Redirect URL is required field!'),
  scopes: Yup.string().required('Scopes is required field!'),
  name: Yup.string().required('Name is required field!'),
  icon: Yup.string().required('Icon URL is required field!'),
  supportEmail: Yup.string().required('Support email is required field!'),
  phone: Yup.string().required('Phone is required field!'),
  homepage: Yup.string().required('Homepage is required field!'),
  launchUri: Yup.string().required('Launch URL is required field!'),
  termsConditionsUri: Yup.string().required('Terms Conditions URL is required field!'),
  privacyPolicyUri: Yup.string().required('Privacy Policy URL is required field!'),
  summary: Yup.string().required('Summary is required field!'),
  description: Yup.string().required('Description is required field!'),
});

const DetailApp = () => {
  //! State
  const { id } = useParams();
  const { mutateAsync: updateAppIntegration } = useUpdateAppIntegration();
  const { data: resDetailApp, isLoading: isLoadingApp } = useGetAppIntegrationDetail(id || '');
  const itemFound = resDetailApp?.data;
  cachedService.setValue('detail-app', itemFound);

  const [activeTab, setActiveTab] = useState(0);

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

  //! Render
  if (isLoadingApp) {
    return <CommonStyles.Loading />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateUpdateApp}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            await updateAppIntegration({ id: itemFound?.id || '', body: values });
            showSuccess('Save successfully!');
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
          <Form noValidate>
            <CommonStyles.Box sx={{ boxShadow: 2, p: 2, borderRadius: 1 }}>
              <CommonStyles.Tabs
                tabs={[
                  {
                    label: 'App Authentication',
                    component: TabAuthentication,
                  },
                  {
                    label: 'App Information',
                    component: TabInformation,
                  },
                ]}
                onChangeTab={(tab) => {
                  setActiveTab(tab);
                }}
              />

              {activeTab !== 0 && (
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CommonStyles.Button
                    loading={isSubmitting}
                    type='submit'
                    startIcon={<CommonIcons.SaveIcon />}
                  >
                    Save
                  </CommonStyles.Button>
                </CommonStyles.Box>
              )}
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(DetailApp);
