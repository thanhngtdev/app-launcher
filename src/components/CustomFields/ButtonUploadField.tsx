import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { FieldInputProps, FormikProps } from 'formik';

interface ButtonUploadFieldProps {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
}

const ButtonUploadField = ({ field }: ButtonUploadFieldProps) => {
  //! State
  const { name, onChange } = field || {};

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      onChange &&
        onChange({
          target: {
            name,
            value: file,
          },
        });
    }
  };

  //! Function

  //! Render
  return (
    <CommonStyles.Button
      color='primary'
      component='label'
      startIcon={<CommonIcons.UploadingIcon fontSize='small' />}
    >
      UPLOAD
      <input hidden accept='image/*' type='file' onChange={onChangeImage} />
    </CommonStyles.Button>
  );
};

export default React.memo(ButtonUploadField);
