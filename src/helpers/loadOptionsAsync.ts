import { PERMISSION_ENUM } from 'consts';
import { convertToFormSelect } from 'helpers';
import { SetBooleanState, SetOptionsValue } from 'interfaces/common';
import { UserInfo } from 'interfaces/user';
import userService from 'services/userService';
import PromiseHandler from './promise';
import { showError } from './toast';

const promiseUserHandler = new PromiseHandler();
export const loadOptionUsers =
  (role?: string | PERMISSION_ENUM, filterOptions?: (el: UserInfo) => boolean) =>
  (text: string, setOptions: SetOptionsValue, setLoading: SetBooleanState) => {
    setLoading(true);
    promiseUserHandler
      .takeLatest(userService.getListUser({ skip: 0, take: 20, filter: text, role: role || '' }))
      .then((res) => {
        const data = res?.data?.items || [];
        const dataFiltered = filterOptions ? data.filter(filterOptions) : data;
        setOptions(convertToFormSelect(dataFiltered, 'username', 'id'));
        setLoading(false);
      })
      .catch((error) => {
        if (!error.isCanceled) {
          showError(error);
          setLoading(false);
        }
      });
  };
