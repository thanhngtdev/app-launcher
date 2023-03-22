import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI, SelectOption, SetBooleanState, SetOptionsValue } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import { RequestAssignUser, UserInfo } from 'services/userService';
import AutoCompleteField from 'components/CustomFields/AutoCompleteField';
import appManagementService from 'services/appManagementService';
import { convertToFormSelect } from 'helpers';
import SelectField from 'components/CustomFields/SelectField';
import { PermissionOptions } from 'consts';

interface Props extends DialogI<Omit<RequestAssignUser, 'appId'> & { appId: SelectOption }> {
  user: UserInfo;
}

const DialogAssignUser = (props: Props) => {
  const { isOpen, toggle, onSubmit, user } = props;

  return (
    <Formik
      initialValues={{
        appId: { label: '', value: '' },
        role: '',
        username: user?.username || '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {({ values, isSubmitting }) => {
        return (
          <DialogMui open={isOpen} onClose={toggle}>
            <Form>
              <DialogTitle>Assign [{user?.username}]</DialogTitle>
              <DialogContent>
                <CommonStyles.Box sx={{ width: '100%', '& > div': { mb: 2, pt: 3 } }}>
                  <FastField
                    name='appId'
                    component={AutoCompleteField}
                    label='Application'
                    loadOptions={(
                      text: string,
                      setOptions: SetOptionsValue,
                      setLoading: SetBooleanState
                    ) => {
                      setLoading(true);
                      appManagementService
                        .getListApp({ skip: 0, take: 5, filter: text })
                        .then((res) => {
                          setLoading(false);
                          const data = res?.data?.items || [];
                          setOptions(convertToFormSelect(data, 'name', 'id'));
                        });
                    }}
                  />

                  <FastField
                    name='role'
                    component={SelectField}
                    label='Role'
                    options={PermissionOptions}
                    fullWidth
                  />
                </CommonStyles.Box>
              </DialogContent>
              <DialogActions>
                <CommonStyles.Button variant='text' onClick={toggle}>
                  Cancel
                </CommonStyles.Button>
                <CommonStyles.Button type='submit' loading={isSubmitting}>
                  Assign
                </CommonStyles.Button>
              </DialogActions>
            </Form>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogAssignUser;
