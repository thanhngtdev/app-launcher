import { lazy } from 'react';
import BaseUrl from 'consts/baseUrl';

// Bash importHere
const Login = lazy(() => import('pages/Login'));
const Callbacks = lazy(() => import('pages/Callbacks'));
const Logout = lazy(() => import('pages/Logout'));

const routesPublic = [
  {
    name: 'Login',
    path: BaseUrl.Login,
    component: Login,
  },
  {
    name: 'Callbacks',
    path: BaseUrl.Callbacks,
    component: Callbacks,
  },
  {
    name: 'Logout',
    path: BaseUrl.Logout,
    component: Logout,
  },
];

export default routesPublic;
