import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { RequestUpdateUserInfo, UserInfo } from 'services/userService';

interface Props extends DialogI<RequestUpdateUserInfo> {
  user: UserInfo;
}

const DialogUpdateUser = (props: Props) => {
  const { isOpen, toggle, onSubmit, user } = props;

  return (
    <Formik
      initialValues={{
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        company: user?.company || '',
        address: user?.address || '',
        phoneNumber: user?.phoneNumber || '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {({ isSubmitting }) => {
        return (
          <DialogMui open={isOpen} onClose={toggle}>
            <Form>
              <DialogTitle>Edit [{user?.username}]</DialogTitle>
              <DialogContent>
                <CommonStyles.Box sx={{ width: '100%', '& > div': { mb: 2 } }}>
                  <FastField component={TextField} name='firstname' label='First name' fullWidth />
                  <FastField component={TextField} name='lastname' label='Last name' fullWidth />
                  <FastField component={TextField} name='company' label='Company' fullWidth />
                  <FastField component={TextField} name='address' label='Address' fullWidth />
                  <FastField
                    component={TextField}
                    name='phoneNumber'
                    label='Phone number'
                    fullWidth
                  />
                </CommonStyles.Box>
              </DialogContent>
              <DialogActions>
                <CommonStyles.Button variant='text' onClick={toggle}>
                  Cancel
                </CommonStyles.Button>
                <CommonStyles.Button type='submit' loading={isSubmitting}>
                  Submit
                </CommonStyles.Button>
              </DialogActions>
            </Form>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogUpdateUser;
