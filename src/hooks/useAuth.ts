import { useMemo } from 'react';
import { useAuth as useAuthOIDC } from 'oidc-react';
import { isEmpty } from 'lodash';
import httpService from 'services/httpService';

//* Hooks to get ALL auth
const useAuth = () => {
  //! State
  //* Auth AWS
  const auth = useAuthOIDC();

  const user = useMemo(() => {
    if (!isEmpty(auth?.userData)) {
      httpService.attachTokenToHeader(auth?.userData?.access_token);
      return auth?.userData;
    }

    return null;
  }, [auth.userData]);

  //! Return
  return useMemo(() => {
    return {
      loading: auth?.isLoading,
      isLogged: !isEmpty(user),
      user,
      logout: auth.signOut,
    };
  }, [user, auth.signOut]);
};

export default useAuth;
