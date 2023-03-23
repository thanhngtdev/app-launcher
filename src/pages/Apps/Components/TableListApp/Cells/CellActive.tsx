import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { App } from 'interfaces/apps';
import { Field, Form, Formik } from 'formik';
import SwitchField from 'components/CustomFields/SwitchField';
import { showError, showSuccess } from 'helpers/toast';
import { useApproveApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';

interface CellActiveProps {
  item: App;
}

const CellActive = (props: CellActiveProps) => {
  //! State
  const { item } = props;
  const isApproved = !!item?.isApproved;
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const { mutateAsync: approveApp } = useApproveApp();

  //! Function

  //! Render
  if (!isAdmin) {
    return (
      <CommonStyles.Box>
        {isApproved && <CommonIcons.CheckIcon color='success' />}{' '}
        {!isApproved && <CommonIcons.CloseIcon color='error' />}
      </CommonStyles.Box>
    );
  }

  return (
    <Formik
      initialValues={{
        isApproved: isApproved,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        (async () => {
          try {
            setSubmitting(true);
            await approveApp({
              appId: item?.id || '',
              isApproved: values.isApproved,
            });

            await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

            if (values.isApproved) {
              showSuccess(`Activate [${item.name}] app successfully!`);
            } else {
              showSuccess(`Deactivate [${item.name}] app successfully!`);
            }

            setSubmitting(false);
          } catch (error) {
            resetForm();
            setSubmitting(false);
            showError(error);
          }
        })();
      }}
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Field
                component={SwitchField}
                name='isApproved'
                afterOnChange={() => {
                  handleSubmit();
                }}
              />
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(CellActive);
