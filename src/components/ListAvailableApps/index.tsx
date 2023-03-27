import React, { Fragment } from 'react';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetListApp, useGetListAppForManager } from 'hooks/app/useAppHooks';
import { NUMBER_DEFAULT_ROW_PER_PAGE, NUMBER_DEFAULT_PAGE } from 'consts';
import { useTheme } from '@mui/material';
import EachApp from '../../pages/Apps/AppsForUser/Components/EachApp';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { cloneDeep } from 'lodash';
import { useAuth } from 'providers/AuthenticationProvider';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 999,
  search: '',
};

const ListAvailableApps = () => {
  //! State
  const { isAppManager } = useAuth();
  const theme = useTheme();
  const { filters, setFilters, handleResetToInitial } = useFiltersHandler(initialValues);
  const useGetListData = isAppManager ? useGetListAppForManager : useGetListApp;

  const { data: resData, isLoading: isInstalledLoading } = useGetListData({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resData?.data?.items || [];
  const total = resData?.data?.totalCount || 0;

  //! Function

  //! Render
  const renderListAppInstalled = () => {
    return (
      <Fragment>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
          }}
        >
          <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
            Store ({total})
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
              return <FastField component={TextField} name='search' label='Search apps' />;
            }}
          />
        </CommonStyles.Box>

        {isInstalledLoading ? (
          <CommonStyles.Loading />
        ) : (
          <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {data.length <= 0 && <CommonStyles.Typography>No app found...</CommonStyles.Typography>}
            {data?.map((el) => {
              return <EachApp key={el.id} item={el} />;
            })}
          </CommonStyles.Box>
        )}
      </Fragment>
    );
  };

  return (
    <CommonStyles.Box
      sx={{
        [theme.breakpoints.down('sm')]: {
          paddingTop: '70px',
        },
      }}
    >
      <CommonStyles.Box sx={{ mb: 2 }}>{renderListAppInstalled()}</CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ListAvailableApps);
