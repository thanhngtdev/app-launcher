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

interface Props extends DialogI<{ username: string }> {}

const initialValues = {
  username: '',
  email: '',
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: NUMBER_DEFAULT_ROW_PER_PAGE + 5,
  order: Order.desc,
  orderBy: '',
};

const DialogListRequesting = (props: Props) => {
  const { isOpen, toggle } = props;

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
  const totalCount = 1;

  const data = [
    {
      id: 'abcxyz-asiofjfsa-asokvkjasb-asvcoiasv-asvjiav',
      userId: 'ajkcnasd-asfioaspjg-asfiopasjgoi-asiogjasg',
      username: 'appuser01',
      firstname: 'string',
      lastname: 'string',
    },
  ];

  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='xl'>
      <DialogContent>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          User(s) Requesting
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
