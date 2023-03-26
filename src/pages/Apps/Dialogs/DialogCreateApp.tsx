import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { RequestCreateApp } from 'services/appManagementService';
import { App } from 'interfaces/apps';
import { useCreateAppIntegration } from 'hooks/app/useAppHooks';
import CommonIcons from 'components/CommonIcons';
import { showError, showSuccess } from 'helpers/toast';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

interface Props extends DialogI<RequestCreateApp> {
  item?: App;
}

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  loginRedirectUri: Yup.string().required('Login Redirect URI is required field!'),
  logoutRedirectUri: Yup.string().required('Logout Redirect URI is required field!'),
});

const DialogCreateApp = (props: Props) => {
  //! State
  const { isOpen, toggle } = props;
  const { mutateAsync: createApp } = useCreateAppIntegration();
  const navigate = useNavigate();

  const initialValues = {
    appType: 0,
    loginRedirectUri: '',
    logoutRedirectUri: '',
    scopes: '',
    name: '',
    icon: '',
    supportEmail: '',
    phone: '',
    homepage: '',
    launchUri: '',
    termsConditionsUri: '',
    privacyPolicyUri: '',
    summary: '',
    description: '',
    isApproved: false,
  };

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateCreateApp}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            const response = await createApp(values);
            const idCreated = response?.data || '';
            navigate(BaseUrl.AppDetailWithID(idCreated));
            showSuccess('Add new app successfully!');
            setSubmitting(false);
          } catch (error) {
            showError(error);
            setSubmitting(false);
          }
        })();
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            <DialogContent>
              <Form>
                <CommonStyles.Box>
                  <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
                    Authentication
                  </CommonStyles.Typography>
                  <CommonStyles.Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                    <CommonIcons.AdminPanelSettingsIcon sx={{ fontSize: 120 }} />
                    <CommonStyles.Typography>
                      Please supply at least one redirect and logout uri. A non-https localhost is
                      acceptable for quick start development
                    </CommonStyles.Typography>
                  </CommonStyles.Box>

                  <CommonStyles.Box
                    sx={{
                      '& > div': {
                        mb: 2,
                      },
                    }}
                  >
                    <FastField
                      component={TextField}
                      name='name'
                      label='Name App'
                      required
                      autoFocus
                      fullWidth
                    />

                    <FastField
                      component={TextField}
                      name='loginRedirectUri'
                      label='Login Redirect URI'
                      required
                      fullWidth
                    />

                    <FastField
                      component={TextField}
                      name='logoutRedirectUri'
                      label='Logout Redirect URI'
                      required
                      fullWidth
                    />
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </Form>
            </DialogContent>
            <DialogActions>
              <CommonStyles.Button variant='text' onClick={toggle}>
                Cancel
              </CommonStyles.Button>
              <CommonStyles.Button
                loading={isSubmitting}
                type='submit'
                onClick={() => handleSubmit()}
              >
                Submit
              </CommonStyles.Button>
            </DialogActions>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogCreateApp;
