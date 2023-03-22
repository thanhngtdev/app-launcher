import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetListApp } from 'hooks/app/useAppHooks';
import { NUMBER_DEFAULT_ROW_PER_PAGE, NUMBER_DEFAUTL_PAGE } from 'consts';
import { useTheme } from '@mui/material';

interface ListAvailableAppsProps {}

const ListAvailableApps = (props: ListAvailableAppsProps) => {
  //! State
  const theme = useTheme();
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
      (filters?.page || NUMBER_DEFAUTL_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resListApp?.data?.items || [];
  const totalCount = resListApp?.data?.totalCount || 0;

  console.log({ data, totalCount });

  //! Function

  //! Render

  return (
    <CommonStyles.Box
      sx={{
        [theme.breakpoints.down('sm')]: {
          paddingTop: '70px',
        },
      }}
    >
      <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
        My Apps
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {data?.map((el) => {
          return (
            <CommonStyles.Box
              key={el.id}
              sx={{
                display: 'flex',
                gap: 5,
                boxShadow: 3,
                borderRadius: 1,
                p: 2,
                width: 'calc(100% / 4 - 18px)',

                [theme.breakpoints.down('lg')]: {
                  width: 'calc(100% / 3 - 16px)',
                },

                [theme.breakpoints.down('md')]: {
                  width: 'calc(100% / 2 - 12px)',
                },

                [theme.breakpoints.down('sm')]: {
                  width: 'calc(100%)',
                },
              }}
            >
              <CommonStyles.Box>
                <CommonStyles.Avatar src={el?.icon || ''} sx={{ width: 70, height: 70 }} />
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ flexGrow: 1 }}>
                <CommonStyles.Typography>{el?.name || '-'}</CommonStyles.Typography>
                <CommonStyles.Typography variant='caption' sx={{ color: theme.colors?.gray }}>
                  {el?.developerName || '-'}
                </CommonStyles.Typography>
                <CommonStyles.Typography sx={{ mt: 2 }} variant='subtitle2'>
                  {el.summary}
                </CommonStyles.Typography>

                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CommonStyles.Button
                    startIcon={<CommonIcons.DownloadingIcon />}
                    onClick={() => {
                      alert('This feature is not available');
                    }}
                  >
                    Install
                  </CommonStyles.Button>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ListAvailableApps);
