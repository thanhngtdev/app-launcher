import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Field, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';

const CenterSide = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:CenterSide'>
      <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <Field
                component={TextField}
                name='search'
                placeholder='Search for reference...'
                sx={{ minWidth: 500 }}
              />
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default React.memo(CenterSide);
