const BaseUrl = {
  // ImportBaseURL
  Homepage: '/',
  Todos: '/todos',
  Login: '/login',
  Callbacks: '/login/callback',
  Logout: '/logout',

  AppManagement: '/apps',
  AppLauncher: '/apps/:id',
  AppLauncherWithID: (id: string) => `/apps/${id}`,
  AppDetail: '/apps/detail/:id',
  AppDetailWithID: (id: string) => `/apps/detail/${id}`,

  CreateApp: '/create-app',

  Users: '/users',
  Settings: '/settings',
  AppConnect: '/app-connect',
};

export default BaseUrl;
