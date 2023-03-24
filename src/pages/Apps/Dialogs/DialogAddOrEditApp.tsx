import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { RequestCreateApp } from 'services/appManagementService';
import { App } from 'interfaces/apps';
import { useGenerateAppCredentials, useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import CommonIcons from 'components/CommonIcons';
import { showError, showSuccess } from 'helpers/toast';

interface Props extends DialogI<RequestCreateApp> {
  item?: App;
}

const DialogAddOrEditApp = (props: Props) => {
  //! State
  const { isOpen, toggle, onSubmit, item } = props;
  const isEdit = !!item;

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
  return (
    <Formik
      enableReinitialize={isEdit}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle}>
            <DialogTitle>
              {isEdit ? `Edit application [${item?.name}]` : 'Add new application'}
            </DialogTitle>
            <DialogContent>
              <Form>
                {isInitialLoading && <CommonStyles.Loading />}

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
                    <FastField component={TextField} name='name' label='Name' fullWidth />
                    <FastField component={TextField} name='phone' label='Phone' fullWidth />
                    <FastField component={TextField} name='homepage' label='Homepage' fullWidth />
                    <FastField
                      component={TextField}
                      name='supportEmail'
                      label='Support Email'
                      fullWidth
                    />
                    <FastField component={TextField} name='scopes' label='Scope' fullWidth />
                    <FastField component={TextField} name='summary' label='Summary' fullWidth />
                    <FastField
                      component={TextField}
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
                    <FastField component={TextField} name='icon' label='Icon URI' fullWidth />
                    <FastField
                      component={TextField}
                      name='launchUri'
                      label='Launch URI'
                      fullWidth
                    />
                    <FastField
                      component={TextField}
                      name='termsConditionsUri'
                      label='Terms & Conditions URI'
                      fullWidth
                    />
                    <FastField
                      component={TextField}
                      name='privacyPolicyUri'
                      label='Privacy & Policy URI'
                      fullWidth
                    />
                    <FastField
                      component={TextField}
                      name='loginRedirectUri'
                      label='Login Redirect URI'
                      fullWidth
                    />
                    <FastField
                      component={TextField}
                      name='logoutRedirectUri'
                      label='Logout Redirect URI'
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

export default DialogAddOrEditApp;
