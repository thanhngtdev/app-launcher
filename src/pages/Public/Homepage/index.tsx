import React, { Fragment } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { useGetListInstalledApp } from 'hooks/app/useAppHooks';
import { useAuth } from 'providers/AuthenticationProvider';
import CommonIcons from 'components/CommonIcons';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { Link } from 'react-router-dom';

// interface AppsProps {}

const Apps = () => {
  //! State
  const theme = useTheme();
  const { isUser, user } = useAuth();

  //! Function

  //! Render
  const renderLeft = () => {
    return (
      <CommonStyles.Box sx={{ flexShrink: 0 }}>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          Apps
        </CommonStyles.Typography>

        <CommonStyles.Box
          sx={{ maxWidth: 580, backgroundColor: theme.colors?.grayLight, p: 2, borderRadius: 1 }}
        >
          <CommonStyles.Box sx={{ mb: 5 }}>
            <CommonStyles.Typography variant='h6' sx={{ mb: 3 }}>
              <b>View Docs</b>
            </CommonStyles.Typography>

            <CommonStyles.Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 1 }}>
              <CommonIcons.BookIcon sx={{ fontSize: 80, color: theme.colors?.purple }} />

              <CommonStyles.Typography>
                We have invested a considerable amount of time to ensure our documentation is as
                comprehensive as possible, from detailed references, to our APIs to a glossary of
                terms and frequently asked questions.
              </CommonStyles.Typography>
            </CommonStyles.Box>

            <CommonStyles.Typography sx={{ mb: 1 }}>
              Having first watched the video, you may want to have a deep dive into the
              documentation before creating your first app.
            </CommonStyles.Typography>

            <CommonStyles.Typography>
              If you get stuck at any point when working with Apps, make the docs your first port of
              call.
            </CommonStyles.Typography>

            <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CommonStyles.Button sx={{ mt: 2 }} variant='outlined'>
                View docs
              </CommonStyles.Button>
            </CommonStyles.Box>
          </CommonStyles.Box>

          {/*  */}
          <CommonStyles.Box>
            <CommonStyles.Typography variant='h6' sx={{ mb: 3 }}>
              <b>Create APP</b>
            </CommonStyles.Typography>

            <CommonStyles.Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 1 }}>
              <CommonIcons.NoteAddIcon sx={{ fontSize: 80, color: theme.colors?.purple }} />

              <CommonStyles.Typography>
                Creating an app is the starting point for authenticating against the Foundations
                APIs. Your app might be a web application, possibly rendered inside of the
                AgencyCloud CRM, or a simple data feed to serve a website.
              </CommonStyles.Typography>
            </CommonStyles.Box>

            <CommonStyles.Typography>
              In all cases, you will need to use the app creation wizard that will walk you through
              creating your app, explain key concepts along the way and link out to our
              documentation where relevant.
            </CommonStyles.Typography>

            <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to={BaseUrl.CreateApp}>
                <CommonStyles.Button sx={{ mt: 2 }} startIcon={<CommonIcons.AddIcon />}>
                  CREATE APP
                </CommonStyles.Button>
              </Link>
            </CommonStyles.Box>
          </CommonStyles.Box>
          {/*  */}
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  const renderRight = () => {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          About Foudations
        </CommonStyles.Typography>

        <CommonStyles.Typography>
          {`
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
          `}
        </CommonStyles.Typography>
      </CommonStyles.Box>
    );
  };

  if (isUser) {
    return (
      <CommonStyles.Box>
        <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
          Hello {user?.username}
        </CommonStyles.Typography>
        <Link to={BaseUrl.AppManagement}>
          <CommonStyles.Button> Go to Apps</CommonStyles.Button>
        </Link>
      </CommonStyles.Box>
    );
  }

  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 5 }}>
      {renderLeft()}
      {renderRight()}
    </CommonStyles.Box>
  );
};

export default React.memo(Apps);
