import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { App } from 'interfaces/apps';
import { Field, Form, Formik } from 'formik';
import SwitchField from 'components/CustomFields/SwitchField';
import { showError, showSuccess } from 'helpers/toast';
import { useSetLiveApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';

interface CellActiveProps {
  item: App;
}

const CellActive = (props: CellActiveProps) => {
  //! State
  const { item } = props;
  const isLive = !!item?.isLive;
  const { isAppManager } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: setLiveApp } = useSetLiveApp();

  //! Function

  //! Render
  return (
    <Formik
      initialValues={{
        isLive: isLive,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        (async () => {
          try {
            setSubmitting(true);
            await setLiveApp({
              appId: item?.id || '',
              isLive: values.isLive,
            });

            await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

            if (values.isLive) {
              showSuccess(`Turn [${item.name}] on successfully!`);
            } else {
              showSuccess(`Turn [${item.name}] off successfully!`);
            }

            if (isAppManager) {
              await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
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
                name='isLive'
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
