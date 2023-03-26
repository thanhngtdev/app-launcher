import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import AutoCompleteField from 'components/CustomFields/AutoCompleteField';
import { loadOptionUsers } from 'helpers/loadOptionsAsync';
import CommonIcons from 'components/CommonIcons';
import cachedService from 'services/cachedService';
import { App } from 'interfaces/apps';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE, PERMISSION_ENUM } from 'consts';
import { useGetUserList } from 'hooks/users/useUsersHooks';
import { showError, showSuccess } from 'helpers/toast';
import { UserInfo } from 'interfaces/user';
import userService from 'services/userService';
import { cloneDeep } from 'lodash';
import CellActions from '../Cells/CellActions';

const initialValues = {
  username: '',
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: NUMBER_DEFAULT_ROW_PER_PAGE,
  order: Order.desc,
  orderBy: '',
};

const TabAssignManager = () => {
  //! State
  const {
    filters,
    setFilters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleResetToInitial,
    handleCheckBox,
    handleResetSelected,
  } = useFiltersHandler(initialValues);
  const app = cachedService.getValue('app') as App;
  const [users, setUsers] = useState([]);
  const [isAssigning, setAssigning] = useState(false);
  const [isUnAssigning, setUnAssigning] = useState(false);

  const {
    data: resUserList,
    isLoading: isLoadingUser,
    refetch,
  } = useGetUserList({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.username,
    role: PERMISSION_ENUM.APP_MANAGER,
    appId: app.id,
  });

  const data = resUserList?.data?.items || [];
  const totalCount = resUserList?.data?.totalCount || 0;

  //! Function
  const onClickAssign = async () => {
    try {
      setAssigning(true);
      const listUsers = users as UserInfo[];
      const listReq = listUsers.map((user) =>
        userService.assignUser({ username: user.username, role: user.roles[0], appId: app.id })
      );

      await Promise.allSettled(listReq);
      await refetch();
      setUsers([]);
      setAssigning(false);
      showSuccess('Assign manager successfully!');
    } catch (error) {
      showError(error);
      setAssigning(false);
    }
  };

  const onClickUnAssign = async () => {
    try {
      setUnAssigning(true);
      const listUsers = selected.map((userId) => {
        return data?.find((el) => el.id === userId);
      });

      const listReq = listUsers.map((user) =>
        userService.unAssignUser({
          username: user?.username || '',
          role: user?.roles?.[0] || '',
          appId: app.id,
        })
      );

      await Promise.allSettled(listReq);
      await refetch();
      handleResetSelected();
      setUnAssigning(false);
      showSuccess('Unassign manager successfully!');
    } catch (error) {
      showError(error);
      setUnAssigning(false);
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 3 }}>
        {`Assign manager(s) -> [${app.name}]`}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 2 }}>
        <AutoCompleteField
          name='username'
          multiple
          label='Select multiple user(s)'
          value={users}
          onChange={(e, values) => {
            setUsers(values);
          }}
          loadOptions={loadOptionUsers(
            PERMISSION_ENUM.APP_MANAGER,
            (el) => !data.map((d) => d.id).includes(el.id)
          )}
          disableCloseOnSelect
          fullWidth
        />

        <CommonStyles.Button
          sx={{ flexShrink: 0 }}
          disabled={users?.length <= 0}
          startIcon={<CommonIcons.AssignIcon />}
          onClick={onClickAssign}
          loading={isAssigning}
        >
          Assign user(s)
        </CommonStyles.Button>
      </CommonStyles.Box>

      <SearchAndFilters
        initialValues={initialValues}
        onSubmit={(values) => {
          setFilters(cloneDeep(values));
        }}
        onReset={() => {
          handleResetToInitial();
        }}
        sxContainer={{ justifyContent: 'flex-end' }}
        renderFilterFields={() => {
          return (
            <CommonStyles.Box sx={{ gap: 2, display: 'flex' }}>
              <FastField
                component={TextField}
                name='username'
                placeholder='Username'
                label='Username'
              />

              <CommonStyles.Button
                variant='outlined'
                loading={isUnAssigning}
                disabled={selected.length <= 0}
                onClick={onClickUnAssign}
                startIcon={<CommonIcons.UnAssignIcon />}
              >
                UnAssign User
              </CommonStyles.Button>
            </CommonStyles.Box>
          );
        }}
      />

      <CommonStyles.Box sx={{ mt: 3 }}>
        <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
          Total record(s): {totalCount}
        </CommonStyles.Typography>
        <CommonStyles.Table
          isLoading={isLoadingUser}
          order={filters?.order || Order.desc}
          orderBy={filters?.orderBy}
          selected={selected}
          page={filters?.page || 0}
          rowsPerPage={filters?.rowsPerPage || 5}
          headCells={[
            {
              label: 'Username',
              id: 'username',
            },
            {
              label: 'Email',
              id: 'email',
            },
            {
              label: 'Actions',
              id: 'actions',
              Cell: (user) => {
                return <CellActions user={user} />;
              },
            },
          ]}
          totalCount={totalCount}
          // invisibleCheckBox={[0]}
          rows={data}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          handleCheckBox={handleCheckBox}
          showCheckBox
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(TabAssignManager);
