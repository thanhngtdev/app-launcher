import { useMemo } from 'react';
import { useAuth as useAuthOIDC } from 'oidc-react';
import { isEmpty } from 'lodash';

//* Hooks to get ALL auth
const useAuth = () => {
  //! State
  //* Auth AWS
  const auth = useAuthOIDC();

  const user = useMemo(() => {
    if (!isEmpty(auth?.userData)) {
      return auth?.userData;
    }

    return null;
  }, [auth.userData]);

  console.log({ user });

  //! Return
  return useMemo(() => {
    return {
      loading: false,
      isLogged: !isEmpty(user),
      user,
      logout: auth.signOut,
    };
  }, [user, auth.signOut]);
};

export default useAuth;
