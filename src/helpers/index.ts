import { PERMISSION_ENUM } from 'consts/index';
import { isString } from 'lodash';
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const convertToFormSelect = (
  list: any[],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? 'None',
            value: el[fieldForValue] ?? '',
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: 'None', value: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: 'None', value: '' }, ...list];
};

export const getNameRole = (role: string) => {
  let result = '';

  Object.entries(PERMISSION_ENUM).forEach((el) => {
    const [key, value] = el;
    if (role === value) {
      result = key;
    }
  });

  return result;
};

export const copyToClipboard = (text = '') => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(text);
  document.body.removeChild(el);
};

export const file2Base64 = (file: File | string): string => {
  if (isString(file)) {
    return file;
  }

  return window.URL.createObjectURL(file);
};
