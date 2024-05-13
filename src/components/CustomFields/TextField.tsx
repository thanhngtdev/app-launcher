import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldInputProps, FormikProps } from 'formik';
import { get, isString } from 'lodash';
import { styled } from '@mui/material/styles';
import CommonStyles from 'components/CommonStyles';
import { ReactNode } from 'react';
import { InputAdornment } from '@mui/material';

const CustomTextField = styled(MuiTextField)(({ theme }) => ({
  '& input:valid + fieldset': {
    borderColor: theme.colors?.borderInput,
    borderWidth: 1,
  },
  '& input': {
    backgroundColor: theme.colors?.white,
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& input:invalid + fieldset': {
    borderColor: theme?.colors?.red,
    borderWidth: 1,
  },
}));

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  iconStartInput?: ReactNode;
}

const TextField = ({ field, form, label, iconStartInput, ...props }: Props & TextFieldProps) => {
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};

  const msgError =
    get(touched, name || '') && get(errors, name || '') ? get(errors, name || '') : '';

  return (
    <CommonStyles.Box>
      {label && (
        <CommonStyles.Typography component='p' sx={{ mb: 1 }}>
          {label}
        </CommonStyles.Typography>
      )}
      <CustomTextField
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={!!msgError}
        helperText={isString(msgError) && msgError}
        variant='outlined'
        size='small'
        sx={{
          '& label': {},
          '& input': {},
        }}
        InputProps={{
          startAdornment: iconStartInput ? (
            <InputAdornment position='start' className='icon-start-input'>
              {iconStartInput}
            </InputAdornment>
          ) : undefined,
        }}
        {...props}
      />
    </CommonStyles.Box>
  );
};

export default TextField;
