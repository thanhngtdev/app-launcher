import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { RequestCreateApp } from 'services/appManagementService';
import { App } from 'interfaces/apps';
import { useGenerateAppCredentials, useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import CommonIcons from 'components/CommonIcons';
import { showError, showSuccess } from 'helpers/toast';
import { Fragment } from 'react';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthenticationProvider';

interface Props extends DialogI<RequestCreateApp> {
  item?: App;
}

export const validateCreateApp = Yup.object().shape({
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

const DialogAddOrEditApp = (props: Props) => {
  //! State
  const { isOpen, toggle, onSubmit, item } = props;
  const { isAdmin } = useAuth();
  const isEdit = !!item;
  const isCreate = !isEdit;

  const { mutateAsync: generateAppCredentials, isLoading: isGenerating } =
    useGenerateAppCredentials();
  const {
    data: resDetailApp,
    isInitialLoading,
    refetch,
  } = useGetAppIntegrationDetail(item?.id || '');
  const itemFound = resDetailApp?.data;

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
    isApproved: itemFound?.isApproved || false,
  };

  const onClickGenerate = async () => {
    try {
      await generateAppCredentials({ appId: item?.id || '' });
      await refetch();
      showSuccess('Generate app credentials successfully!');
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  const renderCreate = () => {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          Authentication
        </CommonStyles.Typography>
        <CommonStyles.Box sx={{ display: 'flex', gap: 3 }}>
          <CommonIcons.AdminPanelSettingsIcon sx={{ fontSize: 120 }} />
          <CommonStyles.Typography>
            Please supply at least one redirect and logout uri. A non-https localhost is acceptable
            for quick start development
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
    );
  };

  const renderEdit = () => {
    return (
      <Fragment>
        {isInitialLoading && <CommonStyles.Loading />}

        {isAdmin && (
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CommonStyles.Button
              startIcon={<CommonIcons.Reset />}
              variant='outlined'
              onClick={onClickGenerate}
              loading={isGenerating}
            >
              Generate App Credentials
            </CommonStyles.Button>
          </CommonStyles.Box>
        )}

        <CommonStyles.Box sx={{ width: '100%', pt: 2 }}>
          <CommonStyles.Typography variant='h5' sx={{ mb: 2 }}>
            Credentials
          </CommonStyles.Typography>
          <CommonStyles.Box sx={{ pl: 2, '& > div': { mb: 2 } }}>
            <TextField
              field={{
                name: 'appClientId',
                value: itemFound?.appClientId || '',
                onChange: () => {},
                onBlur: () => {},
              }}
              label='Client ID'
              InputProps={{
                readOnly: true,
              }}
              variant='filled'
              fullWidth
            />

            <TextField
              field={{
                name: 'appClientName',
                value: itemFound?.appClientName || '',
                onChange: () => {},
                onBlur: () => {},
              }}
              label='Client name'
              InputProps={{
                readOnly: true,
              }}
              variant='filled'
              fullWidth
            />

            <TextField
              field={{
                name: 'appClientSecret',
                value: itemFound?.appClientSecret || '',
                onChange: () => {},
                onBlur: () => {},
              }}
              label='Client secret'
              InputProps={{
                readOnly: true,
              }}
              variant='filled'
              fullWidth
            />
          </CommonStyles.Box>

          <CommonStyles.Typography variant='h5' sx={{ mb: 2 }}>
            Information
          </CommonStyles.Typography>
          <CommonStyles.Box sx={{ pl: 2, '& > div': { mb: 2 } }}>
            <FastField component={TextField} required name='name' label='Name' fullWidth />
            <FastField component={TextField} required name='phone' label='Phone' fullWidth />
            <FastField component={TextField} required name='homepage' label='Homepage' fullWidth />
            <FastField
              component={TextField}
              required
              name='supportEmail'
              label='Support Email'
              fullWidth
            />
            <FastField component={TextField} required name='scopes' label='Scope' fullWidth />
            <FastField component={TextField} required name='summary' label='Summary' fullWidth />
            <FastField
              component={TextField}
              required
              multiline
              name='description'
              label='Description'
              fullWidth
            />
          </CommonStyles.Box>

          <CommonStyles.Typography variant='h5' sx={{ mb: 1 }}>
            Config URI
          </CommonStyles.Typography>
          <CommonStyles.Box sx={{ pl: 2, '& > div': { mb: 2 } }}>
            <FastField component={TextField} required name='icon' label='Icon URI' fullWidth />
            <FastField
              component={TextField}
              required
              name='launchUri'
              label='Launch URI'
              fullWidth
            />
            <FastField
              component={TextField}
              required
              name='termsConditionsUri'
              label='Terms & Conditions URI'
              fullWidth
            />
            <FastField
              component={TextField}
              required
              name='privacyPolicyUri'
              label='Privacy & Policy URI'
              fullWidth
            />
            <FastField
              component={TextField}
              required
              name='loginRedirectUri'
              label='Login Redirect URI'
              fullWidth
            />
            <FastField
              component={TextField}
              required
              name='logoutRedirectUri'
              label='Logout Redirect URI'
              fullWidth
            />
          </CommonStyles.Box>
        </CommonStyles.Box>
      </Fragment>
    );
  };

  return (
    <Formik
      enableReinitialize={isEdit}
      initialValues={initialValues}
      validationSchema={validateCreateApp}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            {/* <DialogTitle>
              {isEdit ? `Edit application [${item?.name}]` : 'Add new application'}
            </DialogTitle> */}
            <DialogContent>
              <Form>
                {isCreate && renderCreate()}
                {isEdit && renderEdit()}
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

export default DialogAddOrEditApp;
