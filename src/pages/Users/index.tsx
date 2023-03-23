import React from 'react';
import CommonStyles from 'components/CommonStyles';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { cloneDeep } from 'lodash';
import { useGetUserList } from 'hooks/users/useUsersHooks';
import CellActions from './Cells/CellActions';
import { getNameRole } from 'helpers';
import { NUMBER_DEFAULT_ROW_PER_PAGE, NUMBER_DEFAULT_PAGE } from 'consts';

const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.desc,
  orderBy: '',
};

const Users = () => {
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
  } = useFiltersHandler(initialValues);

  const { data: resUserList, isLoading } = useGetUserList({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search || '',
  });
  const users = resUserList?.data?.items || [];
  const totalCount = resUserList?.data?.totalCount || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 3 }}>
        Users management
      </CommonStyles.Typography>

      <SearchAndFilters
        initialValues={initialValues}
        onSubmit={(values) => {
          setFilters(cloneDeep(values));
        }}
        onReset={() => {
          handleResetToInitial();
        }}
        sxContainer={{
          justifyContent: 'space-between',
        }}
        renderFilterFields={() => {
          return (
            <CommonStyles.Box sx={{ gap: 2, display: 'flex' }}>
              <CommonStyles.Box sx={{ minWidth: 300 }}>
                <FastField
                  component={TextField}
                  name='search'
                  placeholder='Search'
                  label='Search'
                  fullWidth
                />
              </CommonStyles.Box>
            </CommonStyles.Box>
          );
        }}
      />

      <CommonStyles.Box sx={{ mt: 3 }}>
        <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
          Total record(s): {totalCount}
        </CommonStyles.Typography>
        <CommonStyles.Table
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
              label: 'Phone number',
              id: 'phoneNumber',
            },
            {
              label: 'First name',
              id: 'firstname',
            },
            {
              label: 'Last name',
              id: 'lastname',
            },
            {
              label: 'Role',
              id: 'role',
              Cell: (row) => {
                const role = getNameRole(row?.roles?.[0]);
                if (role) {
                  return <CommonStyles.Chip color='primary' label={getNameRole(row?.roles?.[0])} />;
                }

                return <div />;
              },
            },
            {
              label: '',
              id: 'actions',
              Cell: (row) => {
                return <CellActions user={row} />;
              },
            },
          ]}
          totalCount={totalCount}
          rows={users}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          handleCheckBox={handleCheckBox}
          isLoading={isLoading}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Users);
