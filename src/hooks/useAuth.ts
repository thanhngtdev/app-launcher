import { useState, useMemo, useEffect } from 'react';
import { useAuth as useAuthOIDC } from 'oidc-react';
import httpService from 'services/httpService';
import { useGetUserInfo } from './users/useUsersHooks';
import { PERMISSION_ENUM } from 'consts';

//* Hooks to get ALL auth
const useAuth = () => {
  //! State
  //* Auth AWS
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
  return useMemo(() => {
    return {
      loading: isInitialLoading || auth?.isLoading,
      isLogged: !!accessToken,
      user,
      logout: auth.signOut,
      isAdmin: user?.roles?.includes(PERMISSION_ENUM.ADMIN),
      isAppManager: user?.roles?.includes(PERMISSION_ENUM.APP_MANAGER),
      isUser: user?.roles?.includes(PERMISSION_ENUM.USER),
    };
  }, [accessToken, isInitialLoading, auth.signOut]);
};

export default useAuth;
