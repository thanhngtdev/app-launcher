import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldInputProps, FormikProps } from 'formik';
import { SelectOption, SetBooleanState, SetOptionsValue } from 'interfaces/common';
import Timer from 'helpers/timer';
import { SxProps } from '@mui/material';

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  label?: string;
  key?: string;
  multiple?: boolean;
  name?: string;
  value?: string | object | any[];
  fullWidth?: boolean;
  sx?: SxProps;
  options?: SelectOption[];
  disableCloseOnSelect?: boolean;
  loadOptions?: (text: string, setOptions: SetOptionsValue, setLoading: SetBooleanState) => void;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason | undefined,
    details: AutocompleteChangeDetails<any> | undefined
  ) => void;
  onBlur?: (e: React.FocusEventHandler | any) => void;
}

function AutoCompleteField(props: Props) {
  //! State
  const timer = React.useRef(new Timer());
  const {
    field,
    form,
    loadOptions,
    label,
    key = 'value',
    options: optionsArg = [],
    multiple,
    sx,
    fullWidth,
    disableCloseOnSelect,
    ...restProps
  } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<SelectOption[]>(optionsArg || []);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState<string>('');

  const name = field?.name || restProps?.name || '';
  const value = field?.value || restProps?.value;
  const onBlur = field?.onBlur || restProps?.onBlur;
  //   const { errors, touched } = form || {};

  //! Function
  React.useEffect(() => {
    let active = true;
    if (open) {
      setLoading(true);
      (async () => {
        if (active) {
          timer.current.debounce(() => {
            loadOptions && loadOptions(text, setOptions, setLoading);
          }, 500);
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [open, setOptions, text]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //! Render
  return (
    <Autocomplete
      id={name}
      multiple={multiple}
      open={open}
      fullWidth={fullWidth}
      sx={sx}
      value={value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value, reason, details) => {
        form?.setFieldValue(name, value);
        restProps.onChange && restProps?.onChange(event, value, reason, details);
      }}
      onInputChange={(event, newInputValue) => {
        setText(newInputValue);
      }}
      onBlur={onBlur}
      inputValue={text}
      isOptionEqualToValue={(option, value) => {
        return option[key] === value[key];
      }}
      getOptionLabel={(option) => option.label}
      loading={loading}
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || 'Asynchronous'}
          name={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default AutoCompleteField;
