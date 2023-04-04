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
import cachedService from 'services/cachedService';

type ActionPostMessage = 'logout';
export interface EventListenerI {
  data: {
    action: ActionPostMessage;
    idApp: string;
    value: any;
  };
}

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
  accessToken: string;
  eventListener: (e: any) => void;
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
  accessToken: '',
  eventListener: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);

const authService = new AuthService();
locationService.setInitialPathname();
cachedService.initialState();

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [isTokenAttached, setTokenAttached] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isCheckingAuth, setCheckingAuth] = useState(false);
  const { mutateAsync: logoutUser } = useLogoutUser();

  const accessToken = userData?.access_token || '';
  const { data: resUser, isInitialLoading } = useGetUserInfo(!!accessToken && isTokenAttached);
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
      if (user) {
        window.location.reload();
      }
    } catch (error) {
      showError(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser(userData?.access_token || '');
      authService.removeUser();
      window.location.href = LOGOUT_REDIRECT_URI;

      httpService.clearAuthStorage();
      window.sessionStorage.clear();
    } catch (error) {
      showError(error);
    }
  }, [userData, logoutUser]);

  const eventListener = useCallback((cb: (e: any) => void) => {
    const addEventListener = window.addEventListener as any;
    const eventMethod = addEventListener ? 'addEventListener' : ('attachEvent' as any);
    const eventer = window[eventMethod] as any;
    const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    eventer(messageEvent, cb, false);
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      accessToken,
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
      eventListener,
    };
  }, [
    user,
    isCheckingAuth,
    isInitialLoading,
    authService,
    loginPopup,
    accessToken,
    eventListener,
    logout,
  ]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
