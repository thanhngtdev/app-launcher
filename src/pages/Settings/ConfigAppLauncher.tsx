import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Formik, Form, Field } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { Editor } from '@tinymce/tinymce-react';
import { API_KEY_TINY_EDITOR } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { RequestSetPlatFormSetting } from 'services/platformService';
import { useGetPlatformSettings, useSetPlatformSettings } from 'hooks/platform/usePlatformHooks';
import CommonIcons from 'components/CommonIcons';
import ButtonUploadField from 'components/CustomFields/ButtonUploadField';
import { file2Base64 } from 'helpers';

const ConfigAppLauncher = () => {
  //! State
  const { data: resPlatform, isLoading, refetch } = useGetPlatformSettings();
  const { mutateAsync: setPlatformSetting } = useSetPlatformSettings();

  const item = resPlatform?.data;

  const initialValues: RequestSetPlatFormSetting = {
    launcherLogo: item?.launcherLogo || '',
    brandLogo: item?.brandLogo || '',
    mainColour: item?.mainColour || '',
    detailText: item?.detailText || '',
    summaryHeading: item?.summaryHeading || '',
  };

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box sx={{ mt: 3, p: 2, boxShadow: 2, borderRadius: 1 }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              setSubmitting(true);
              await setPlatformSetting(values);
              await refetch();
              showSuccess('Save successfully!');
              setSubmitting(false);
            } catch (error) {
              showError(error);
            }
          })();
        }}
      >
        {({ values, isSubmitting, handleChange }) => {
          return (
            <Form>
              <CommonStyles.Typography variant='h5' sx={{ mb: 2 }}>
                App configuration
              </CommonStyles.Typography>

              <Field
                component={TextField}
                label='Main color'
                name='mainColour'
                type='color'
                sx={{ width: 80 }}
              />

              <CommonStyles.Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                {/* Brand logo */}
                <CommonStyles.Box sx={{ flexGrow: 1 }}>
                  <CommonStyles.Typography sx={{ mb: 2 }}>Brand logo</CommonStyles.Typography>
                  <CommonStyles.Box>
                    <img alt='brand-logo' src={file2Base64(values?.brandLogo || '')} />
                  </CommonStyles.Box>
                  <CommonStyles.Box sx={{ mt: 2 }}>
                    <Field component={ButtonUploadField} name='brandLogo' />
                  </CommonStyles.Box>
                </CommonStyles.Box>

                {/* Launcher logo */}
                <CommonStyles.Box sx={{ flexGrow: 1 }}>
                  <CommonStyles.Typography sx={{ mb: 2 }}>Launcher logo</CommonStyles.Typography>
                  <CommonStyles.Box>
                    <img alt='launcher-logo' src={file2Base64(values?.launcherLogo || '')} />
                  </CommonStyles.Box>
                  <CommonStyles.Box sx={{ mt: 2 }}>
                    <Field component={ButtonUploadField} name='launcherLogo' />
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ mt: 3 }}>
                <CommonStyles.Typography sx={{ mb: 1 }}>
                  <b>Summary Heading</b>
                </CommonStyles.Typography>
                <Editor
                  apiKey={API_KEY_TINY_EDITOR}
                  initialValue={initialValues.summaryHeading}
                  value={values.summaryHeading}
                  onEditorChange={(e) => {
                    handleChange({ target: { name: 'summaryHeading', value: e } });
                  }}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ mt: 3 }}>
                <CommonStyles.Typography sx={{ mb: 1 }}>
                  <b>Description</b>
                </CommonStyles.Typography>
                <Editor
                  apiKey={API_KEY_TINY_EDITOR}
                  initialValue={initialValues.detailText}
                  value={values.detailText}
                  onEditorChange={(e) => {
                    handleChange({ target: { name: 'detailText', value: e } });
                  }}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <CommonStyles.Button
                  loading={isSubmitting}
                  startIcon={<CommonIcons.SaveIcon />}
                  type='submit'
                >
                  Save
                </CommonStyles.Button>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default React.memo(ConfigAppLauncher);
