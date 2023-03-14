import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';

interface AppsProps {}

const Apps = (props: AppsProps) => {
  //! State
  const theme = useTheme();
  const user = useAuth();

  //! Function

  //! Render
  const apps = [
    {
      label: 'Name of App',
      company: 'Nextlvl',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum `,
      img: 'https://picsum.photos/id/237/200/300',
    },
    {
      label: 'Name of App',
      company: 'Nextlvl',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum `,
      img: 'https://picsum.photos/id/237/200/300',
    },
    {
      label: 'Name of App',
      company: 'Nextlvl',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum `,
      img: 'https://picsum.photos/id/237/200/300',
    },
    {
      label: 'Name of App',
      company: 'Nextlvl',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum `,
      img: 'https://picsum.photos/id/237/200/300',
    },
    {
      label: 'Name of App',
      company: 'Nextlvl',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum `,
      img: 'https://picsum.photos/id/237/200/300',
    },
  ];

  return (
    <CommonStyles.Box>
      <CommonStyles.Box sx={{ p: 1, background: 'rgba(0, 0, 0, 0.1)', mb: 2 }}>
        <code style={{ overflowWrap: 'anywhere' }}> {JSON.stringify(user)}</code>
      </CommonStyles.Box>

      <CommonStyles.Typography variant='h4' sx={{ mb: 5 }}>
        My Apps
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{
          display: 'flex',
          gap: 5,
          flexWrap: 'wrap',
          [theme.breakpoints.down('lg')]: {
            gap: 4,
          },

          [theme.breakpoints.down('md')]: {
            gap: 3,
          },

          [theme.breakpoints.down('sm')]: {
            gap: 2,
          },
        }}
      >
        {apps.map((el, index) => {
          return (
            <CommonStyles.Box
              key={`${el.label}-${index}`}
              sx={{
                display: 'flex',
                p: 2,
                gap: 3,
                boxShadow: 3,
                borderRadius: 1,
                width: 'calc(100% / 4 - 30px)',
                transition: '.3s',

                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: 6,
                },

                [theme.breakpoints.down('lg')]: {
                  width: 'calc(100% / 3 - 27px)',
                },

                [theme.breakpoints.down('md')]: {
                  width: 'calc(100% / 2 - 20px)',
                },

                [theme.breakpoints.down('sm')]: {
                  width: 'calc(100%)',
                },
              }}
            >
              <CommonStyles.Box
                sx={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  '& > img': {
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                }}
              >
                <img src={el.img} alt='company-logo' />
              </CommonStyles.Box>

              <CommonStyles.Box>
                <CommonStyles.Typography variant='h6'>{el.label}</CommonStyles.Typography>
                <CommonStyles.Typography variant='body2' sx={{ mb: 1 }}>
                  {el.company}
                </CommonStyles.Typography>

                <CommonStyles.Typography variant='body2' sx={{ color: theme.colors?.gray }}>
                  {el.desc}
                </CommonStyles.Typography>
              </CommonStyles.Box>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Apps);
