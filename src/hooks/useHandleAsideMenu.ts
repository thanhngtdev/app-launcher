import { useMemo } from 'react';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';
import useAuth from './useAuth';

const navbarAdmin = [
  [
    {
      label: 'Apps',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.Homepage,
    },
    {
      label: 'Apps Management',
      icon: CommonIcons.CloudIcon,
      href: BaseUrl.AppManagement,
    },
    {
      label: 'Users',
      icon: CommonIcons.Users,
      href: BaseUrl.Users,
    },
  ],
];

// const navbarUser = [
//   [
//     {
//       label: 'Homepage',
//       icon: CommonIcons.HomeIcon,
//       href: '/',
//     },
//   ],
// ];

const useHandleAsideMenu = () => {
  const { isLogged } = useAuth();

  return useMemo(() => {
    if (!isLogged) {
      return [];
    }

    return navbarAdmin;
  }, [isLogged]);
};

export default useHandleAsideMenu;
