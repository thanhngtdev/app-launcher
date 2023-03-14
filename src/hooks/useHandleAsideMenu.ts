import { useMemo } from 'react';
import CommonIcons from 'components/CommonIcons';
import { useAppAuthentication } from 'providers/AppAuthenticationProvider';
import { PERMISSION_ENUM } from 'constants/index';

const navbarAdmin = [
  [
    {
      label: 'Apps',
      icon: CommonIcons.CloudIcon,
      href: '/',
    },
    {
      label: 'Todo',
      icon: CommonIcons.InboxIcon,
      href: '/todos/12',
    },
    {
      label: 'Todos',
      icon: CommonIcons.MailIcon,
      href: '/todos',
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
  const { user } = useAppAuthentication();
  const role = user?.role;

  return useMemo(() => {
    return navbarAdmin;

    if (role === PERMISSION_ENUM.ADMIN) {
      return navbarAdmin;
    }

    return navbarUser;
  }, [role]);
};

export default useHandleAsideMenu;
