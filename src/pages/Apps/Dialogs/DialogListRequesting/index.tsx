import SearchAndFilters from 'components/SearchAndFilters';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';

import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogI } from 'interfaces/common';
import { FastField } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import CellActions from './Cells/CellActions';
import { useGetListRequestingApp } from 'hooks/app/useAppHooks';

interface Props extends DialogI<{ username: string }> {
  appId: string;
}

const initialValues = {
  search: '',
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: NUMBER_DEFAULT_ROW_PER_PAGE + 5,
  order: Order.desc,
  orderBy: '',
};

const DialogListRequesting = (props: Props) => {
  const { isOpen, toggle, appId } = props;

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
  const { data: resList, isLoading: isLoadingList } = useGetListRequestingApp({
    appId,
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resList?.data?.items || [];
  const totalCount = resList?.data?.totalCount || 0;

  //! Function

  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='xl'>
      <DialogContent>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          User(s) Requesting
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
                  name='search'
                  placeholder='Input search'
                  label='Search'
                />
              </CommonStyles.Box>
            );
          }}
        />

        <CommonStyles.Box sx={{ mt: 3 }}>
          <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
            Total record(s): {totalCount}
          </CommonStyles.Typography>
          <CommonStyles.Table
            isLoading={isLoadingList}
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
                label: 'First name',
                id: 'firstname',
              },
              {
                label: 'Last name',
                id: 'lastname',
              },
              {
                label: 'Actions',
                id: 'actions',
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
            handleCheckBox={handleCheckBox}
          />
        </CommonStyles.Box>
      </DialogContent>
      <DialogActions>
        <CommonStyles.Button variant='text' onClick={toggle}>
          Cancel
        </CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default DialogListRequesting;
