import React, { Fragment, lazy } from 'react';
import BaseUrl from 'consts/baseUrl';
import withCheckRole from 'HOCs/withCheckRole';
import { PERMISSION_ENUM } from 'consts/index';

// Bash importHere
const DefaultLayout = lazy(() => import('layouts/DefaultLayout'));
const Login = lazy(() => import('pages/Login'));
const Apps = lazy(() => import('pages/Homepage'));
const Callbacks = lazy(() => import('pages/Callbacks'));
const AppManagement = lazy(() => import('pages/Apps'));
const CreateApp = lazy(() => import('pages/Apps/CreateApp'));
const Users = lazy(() => import('pages/Users'));
const Settings = lazy(() => import('pages/Settings'));
const Logout = lazy(() => import('pages/Logout'));
const AppConnect = lazy(() => import('pages/AppConnect'));
const Laucher = lazy(() => import('pages/Launcher'));

interface Route {
  name: string;
  path: string;
  layout:
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>
    | typeof React.Component;
  routeChild: {
    name: string;
    path: string;
    component: typeof React.Component | React.FC;
    isPrivateRoute?: boolean;
  }[];
}

const routes: Route[] = [
  {
    name: 'Login Layout',
    path: BaseUrl.Login,
    layout: Fragment,
    routeChild: [
      {
        name: 'Login',
        path: BaseUrl.Login,
        component: Login,
      },
    ],
  },

  {
    name: 'Callbacks Layout',
    path: BaseUrl.Callbacks,
    layout: Fragment,
    routeChild: [
      {
        name: 'Callbacks',
        path: BaseUrl.Callbacks,
        component: Callbacks,
      },
    ],
  },

  {
    name: 'Callbacks Logout',
    path: BaseUrl.Logout,
    layout: Fragment,
    routeChild: [
      {
        name: 'Logout',
        path: BaseUrl.Logout,
        component: Logout,
      },
    ],
  },

  {
    name: 'App Connect',
    path: BaseUrl.AppConnect,
    layout: Fragment,
    routeChild: [
      {
        name: 'App connect',
        path: BaseUrl.AppConnect,
        component: AppConnect,
      },
    ],
  },
  {
    name: 'Home Layout',
    path: '/',
    layout: DefaultLayout,
    routeChild: [
      // Bash appendHere
      {
        name: 'Homepage',
        path: BaseUrl.Homepage,
        component: withCheckRole(Apps, [PERMISSION_ENUM.PUBLIC]),
        isPrivateRoute: true,
      },
      {
        name: 'App Management',
        path: BaseUrl.AppManagement,
        component: withCheckRole(AppManagement, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'App Launcher',
        path: BaseUrl.AppLauncher,
        component: withCheckRole(Laucher, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'Create App',
        path: BaseUrl.CreateApp,
        component: withCheckRole(CreateApp, [PERMISSION_ENUM.PUBLIC]),
        isPrivateRoute: true,
      },
      {
        name: 'Users',
        path: BaseUrl.Users,
        component: withCheckRole(Users, [PERMISSION_ENUM.ADMIN]),
        isPrivateRoute: true,
      },
      {
        name: 'Settings',
        path: BaseUrl.Settings,
        component: withCheckRole(Settings, [PERMISSION_ENUM.PUBLIC]),
        isPrivateRoute: true,
      },
    ],
  },
];

export default routes;
