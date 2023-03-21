import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';

interface UsersProps {}

const initialValues = {
  username: '',
  email: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.desc,
  orderBy: '',
};

const Users = (props: UsersProps) => {
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

  //! Function
  const totalCount = 2;

  const data = [
    {
      id: '1',
      name: 'Pham Quy Don',
      email: 'donezombie@gmail.com',
    },
    {
      id: '2',
      name: 'Pham Quy Don 2',
      email: 'donezombie2@gmail.com',
    },
  ];

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 3 }}>
        Users management
      </CommonStyles.Typography>

      <CommonStyles.Typography sx={{ mb: 2 }}>
        <code style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 12 }}>
          {JSON.stringify({ filters: { ...filters, selected } })}
        </code>
      </CommonStyles.Typography>

      <SearchAndFilters
        initialValues={initialValues}
        onSubmit={(values) => {
          setFilters(values);
        }}
        onReset={() => {
          handleResetToInitial();
        }}
        renderFilterFields={() => {
          return (
            <CommonStyles.Box sx={{ gap: 2, display: 'flex' }}>
              <FastField
                component={TextField}
                name='username'
                placeholder='Username'
                label='Username'
              />
              <FastField component={TextField} name='email' placeholder='Email' label='Email' />
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
              label: 'Name',
              id: 'name',
            },
            {
              label: 'Email',
              id: 'email',
            },
          ]}
          totalCount={totalCount}
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

export default React.memo(Users);
