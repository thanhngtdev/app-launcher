import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useGetListApp, useGetListAppForManager } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import CellActions from './Cells/CellActions';
import { Order } from 'interfaces/common';
import { NUMBER_DEFAULT_ROW_PER_PAGE, NUMBER_DEFAULT_PAGE } from 'consts';
import CellActive from './Cells/CellActive';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { cloneDeep } from 'lodash';
import { useAuth } from 'providers/AuthenticationProvider';
import CellApproval from './Cells/CellApproval';

const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.asc,
  orderBy: 'CreatedDate',
};

const TableListApp = () => {
  //! State
  const { isAppManager } = useAuth();
  const {
    filters,
    selected,
    setFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleResetToInitial,
  } = useFiltersHandler(initialValues);

  const useGetListData = isAppManager ? useGetListAppForManager : useGetListApp;

  const { data: resListApp, isLoading } = useGetListData({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resListApp?.data?.items || [];
  const totalCount = resListApp?.data?.totalCount || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
        App(s) Management
      </CommonStyles.Typography>
      <CommonStyles.Typography sx={{ mb: 2 }} variant='h6'>
        Total: {totalCount}
      </CommonStyles.Typography>

      <SearchAndFilters
        sxContainer={{ mb: 2 }}
        initialValues={initialValues}
        onSubmit={(values) => {
          setFilters(cloneDeep(values));
        }}
        onReset={() => {
          handleResetToInitial();
        }}
        renderFilterFields={() => {
          return <FastField component={TextField} name='search' label='Search' />;
        }}
      />

      <CommonStyles.Table
        order={filters?.order || Order.desc}
        orderBy={filters?.orderBy}
        selected={selected}
        page={filters?.page || 0}
        rowsPerPage={filters?.rowsPerPage || 5}
        headCells={[
          {
            label: 'Icon',
            id: 'icon',
            Cell: (row) => {
              const { icon } = row;
              return <CommonStyles.Avatar src={icon} sx={{ width: 56, height: 56 }} />;
            },
          },
          {
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Developer name',
            id: 'developerName',
          },
          {
            label: 'Summary',
            id: 'summary',
          },
          {
            label: 'Live',
            id: 'isLive',
            Cell: (row) => {
              return <CellActive item={row} />;
            },
          },
          {
            label: 'Approved',
            id: 'isApproved',
            Cell: (row) => {
              return <CellApproval item={row} />;
            },
          },
          {
            label: '',
            id: 'actions',
            disableSort: true,
            Cell: (row) => {
              return <CellActions item={row} />;
            },
          },
        ]}
        totalCount={totalCount}
        rows={data}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
        isLoading={isLoading}
      />
    </CommonStyles.Box>
  );
};

export default React.memo(TableListApp);
