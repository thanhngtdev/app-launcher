import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PERMISSION_ENUM } from 'consts/index';
import httpService from 'services/httpService';
import { useGetUserInfo } from 'hooks/users/useUsersHooks';
import { useAuth as useAuthOIDC } from 'oidc-react';
import { UserInfo } from 'interfaces/user';

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: UserInfo | null;
  logout: () => void;
  isAdmin: boolean;
  isAppManager: boolean;
  isUser: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  logout: () => {},
  isAdmin: false,
  isAppManager: false,
  isUser: false,
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [isTokenAttached, setTokenAttached] = useState(false);
  const auth = useAuthOIDC();

  const accessToken = auth?.userData?.access_token || httpService.getTokenStorage();
  const { data: resUser, isInitialLoading } = useGetUserInfo(!!accessToken && isTokenAttached);
  const user = resUser?.data || null;

  useEffect(() => {
    if (accessToken) {
      httpService.attachTokenToHeader(accessToken);
      httpService.setupInterceptors(auth);
      httpService.saveTokenStorage(accessToken);
      setTokenAttached(true);
    }
  }, [accessToken]);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isInitialLoading || auth?.isLoading,
      isLogged: !!accessToken,
      user,
      logout: () => {
        auth.signOut();
        httpService.clearTokenStorage();
      },
      isAdmin: !!user?.roles?.includes(PERMISSION_ENUM.ADMIN),
      isAppManager: !!user?.roles?.includes(PERMISSION_ENUM.APP_MANAGER),
      isUser: !!user?.roles?.includes(PERMISSION_ENUM.USER),
    };
  }, [accessToken, user, isInitialLoading, auth]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
