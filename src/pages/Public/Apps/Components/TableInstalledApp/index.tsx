import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useGetListInstalledApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import CellActions from './Cells/CellActions';
import { Order } from 'interfaces/common';

const TableInstalledApp = () => {
  //! State
  const {
    filters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler({ search: '' });

  const { data: resListInstalledApp, isLoading: isInstalledLoading } = useGetListInstalledApp({
    skip: filters?.page || 0,
    take: filters?.rowsPerPage || 5,
    filter: filters?.search,
  });
  const dataInstallApp = resListInstalledApp?.data?.items || [];
  const totalCountInstallApp = resListInstalledApp?.data?.totalCount || 0;

  //! Function

  //! Render
  if (isInstalledLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
        Installed Application Listing
      </CommonStyles.Typography>
      <CommonStyles.Typography sx={{ mb: 2 }} variant='h6'>
        Total: {totalCountInstallApp}
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
            label: '',
            id: 'actions',
            disableSort: true,
            Cell: (row) => {
              return <CellActions item={row} />;
            },
          },
        ]}
        totalCount={totalCountInstallApp}
        rows={dataInstallApp}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
      />
    </CommonStyles.Box>
  );
};

export default React.memo(TableInstalledApp);
