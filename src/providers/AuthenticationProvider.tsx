import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PERMISSION_ENUM } from 'consts/index';
import httpService from 'services/httpService';
import { useGetUserInfo, useLogoutUser } from 'hooks/users/useUsersHooks';
import { UserInfo } from 'interfaces/user';
import { LOGOUT_REDIRECT_URI } from 'consts/configAWS';
import { isEmpty } from 'lodash';
import AuthService from 'services/authService';
import { User } from 'oidc-client-ts';
import { showError } from 'helpers/toast';
import locationService from 'services/locationService';

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: UserInfo | null;
  logout: () => void;
  loginPopup: () => void;
  loginPopupCallback: () => any;
  isAdmin: boolean;
  isAppManager: boolean;
  isUser: boolean;
  initialPathName: string;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  logout: () => {},
  loginPopup: () => {},
  loginPopupCallback: () => Promise.resolve({} as any),
  isAdmin: false,
  isAppManager: false,
  isUser: false,
  initialPathName: '',
});

export const useAuth = () => useContext(AuthenticationContext);

locationService.setInitialPathname();
const authService = new AuthService();
const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [isTokenAttached, setTokenAttached] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isCheckingAuth, setCheckingAuth] = useState(false);
  const { mutateAsync: logoutUser } = useLogoutUser();

  const { data: resUser, isInitialLoading } = useGetUserInfo(
    !!userData?.access_token && isTokenAttached
  );
  const user = resUser?.data || null;

  const onGetUserDataSuccess = useCallback((user: User | null) => {
    if (user) {
      const accessToken = user?.access_token;
      httpService.saveUserStorage(user);
      httpService.saveTokenStorage(accessToken);
      httpService.attachTokenToHeader(accessToken);
      setTokenAttached(true);
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCheckingAuth(true);
        const user = await authService.getUser();
        if (user) {
          onGetUserDataSuccess(user);
        } else {
          const userStorage = httpService.getUserStorage();
          userStorage && onGetUserDataSuccess(userStorage);
        }

        setCheckingAuth(false);
      } catch (error) {
        showError(error);
        setCheckingAuth(false);
      }
    })();
  }, [onGetUserDataSuccess]);

  const loginPopup = useCallback(async () => {
    try {
      const loginPopupBinded = authService.loginPopup.bind(authService);
      const user = await loginPopupBinded();
      onGetUserDataSuccess(user);
    } catch (error) {
      showError(error);
    }
  }, [onGetUserDataSuccess]);

  const logout = useCallback(async () => {
    try {
      await logoutUser(userData?.access_token || '');
      window.location.href = LOGOUT_REDIRECT_URI;

      httpService.clearAuthStorage();
      window.sessionStorage.clear();
    } catch (error) {
      showError(error);
    }
  }, [userData, logoutUser]);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isCheckingAuth || isInitialLoading,
      isLogged: !isEmpty(user),
      user,
      loginPopupCallback: authService.loginPopupCallback.bind(authService),
      loginPopup,
      logout,
      isAdmin: !!user?.roles?.includes(PERMISSION_ENUM.ADMIN),
      isAppManager: !!user?.roles?.includes(PERMISSION_ENUM.APP_MANAGER),
      isUser: !!user?.roles?.includes(PERMISSION_ENUM.USER),
      initialPathName: locationService.initialPathname,
    };
  }, [user, isCheckingAuth, isInitialLoading, authService, loginPopup, logout]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
