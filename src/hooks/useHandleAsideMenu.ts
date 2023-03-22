import { useMemo } from 'react';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';

const navbarAdmin = [
  [
    {
      label: 'Home',
      icon: CommonIcons.HomeIcon,
      href: BaseUrl.Homepage,
    },
    {
      label: 'Apps',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.AppManagement,
    },
    {
      label: 'Users',
      icon: CommonIcons.Users,
      href: BaseUrl.Users,
    },
    {
      label: 'Settings',
      icon: CommonIcons.SettingsIcon,
      href: BaseUrl.Settings,
    },
  ],
];

const navbarAppManager = [
  [
    {
      label: 'Home',
      icon: CommonIcons.HomeIcon,
      href: BaseUrl.Homepage,
    },
    {
      label: 'Apps',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.AppManagement,
    },
    {
      label: 'Settings',
      icon: CommonIcons.SettingsIcon,
      href: BaseUrl.Settings,
    },
  ],
];

const navbarUser = [
  [
    {
      label: 'Homepage',
      icon: CommonIcons.HomeIcon,
      href: '/',
    },
  ],
];

const useHandleAsideMenu = () => {
  const { loading, isLogged, isAdmin, isAppManager } = useAuth();

  return useMemo(() => {
    if (loading || !isLogged) {
      return [];
    }

    if (isAdmin) {
      return navbarAdmin;
    }

    if (isAppManager) {
      return navbarAppManager;
    }

    return navbarUser;
  }, [loading, isLogged, isAdmin, isAppManager]);
};

export default useHandleAsideMenu;
