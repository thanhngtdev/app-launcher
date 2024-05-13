import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { Field, Form, Formik } from 'formik';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import React, { useMemo } from 'react';
import HeadEachSection from './HeaderOfSection';
import { useTheme } from '@mui/material';

const tabs = [
  { label: 'Assigned', component: 'snsnsn' },
  { label: 'Recently Viewed', component: 'snsnsn' },
];

const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.asc,
  orderBy: 'CreatedDate',
};

const RecentActivity = () => {
  //! State
  const theme = useTheme();

  const data = [
    { id: 1, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'home' },
    { id: 2, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'list' },
    { id: 3, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'home' },
    { id: 3, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'home' },
    { id: 3, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'home' },
    { id: 3, name: '#HDWUAOHUIO821', date: '29/06/2023', icon: 'list' },
  ];

  const {
    filters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler(initialValues);

  //! Function

  //! Render

  const renderSearch = useMemo(() => {
    return (
      <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <Field
                component={TextField}
                name='search'
                placeholder='Filter for reference...'
                sx={{ minWidth: 500 }}
                iconStartInput={<CommonIcons.Search />}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }, []);

  return (
    <CommonStyles.Box className='component:RecentActivity'>
      <HeadEachSection title='Recent Activity' subTitle={renderSearch} />
      <CommonStyles.Tabs tabs={tabs} />

      <CommonStyles.Box sx={{ mt: 5 }}>
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
              disableSort: true,
              Cell: (row) => {
                const renderIcon = useMemo(() => {
                  switch (row.icon) {
                    case 'home':
                      return (
                        <CommonIcons.IoHomeOutline size={20} color={theme.palette.primary.main} />
                      );
                    case 'list':
                      return <CommonIcons.IoListOutline size={20} color={theme.colors?.blue} />;
                  }
                }, []);
                return <CommonStyles.Box>{renderIcon}</CommonStyles.Box>;
              },
            },
            {
              label: 'Name',
              id: 'name',
              disableSort: true,
              Cell: (row) => {
                return (
                  <CommonStyles.Typography sx={{ width: 350 }}>{row?.name}</CommonStyles.Typography>
                );
              },
            },
            {
              label: 'phone',
              id: 'phone',
              disableSort: true,
              Cell: (row) => {
                return <CommonIcons.DenyAccess sx={{ width: 24, height: 24 }} />;
              },
            },
            {
              label: 'date',
              id: 'date',
              disableSort: true,
              Cell: (row) => {
                return <CommonStyles.Typography>{row?.date}</CommonStyles.Typography>;
              },
            },
            {
              label: 'more',
              id: 'more',
              Cell: (row) => {
                return <CommonIcons.IoEllipsisVerticalSharp size={18} />;
              },
              disableSort: true,
            },
          ]}
          totalCount={10}
          rows={data || []}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          isLoading={false}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RecentActivity);
