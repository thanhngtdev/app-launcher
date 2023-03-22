import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import CellActions from './Cells/CellActions';
import { Order } from 'interfaces/common';
import { NUMBER_DEFAULT_ROW_PER_PAGE, NUMBER_DEFAULT_PAGE } from 'consts';
import CellActive from './Cells/CellActive';

const TableListApp = () => {
  //! State
  const {
    filters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler({ search: '' });

  const { data: resListApp, isLoading } = useGetListApp({
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
        Application Listing
      </CommonStyles.Typography>
      <CommonStyles.Typography sx={{ mb: 2 }} variant='h6'>
        Total: {totalCount}
      </CommonStyles.Typography>

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
            label: 'Active',
            id: 'active',
            Cell: (row) => {
              return <CellActive item={row} />;
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
