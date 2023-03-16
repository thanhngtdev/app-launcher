import { CONNECTOR_ENUM } from 'consts/index';
import { AuthProvider, AuthContextProps } from 'oidc-react';
import { useCached } from 'providers/CachedProvider';
import useAuth from 'hooks/useAuth';

const ComponentWithAuth = ({
  children,
}: {
  children: (arg: AuthContextProps) => React.ReactElement;
}) => {
  const auth = useAuth();

  return children && children(auth);
};

const withOktaAuth = (ComponentWrapped: any) => {
  const config = {
    onSignIn: (user: any) => {
      window.location.href = '/';
    },
    authority: 'https://dev-52561526.okta.com/oauth2/default/.well-known/openid-configuration',
    clientId: '0oa8nrumwepT7Sdp05d7',
    redirectUri: 'http://localhost:3000/login/callback',
    autoSignIn: false,
  };

  return () => {
    const cached = useCached();

    return (
      <AuthProvider {...config}>
        <ComponentWithAuth>
          {(auth) => {
            cached.set(CONNECTOR_ENUM.OKTA, auth);
            return <ComponentWrapped />;
          }}
        </ComponentWithAuth>
      </AuthProvider>
    );
  };
};

// const withGoogleAuth = (ComponentWrapped: any) => {
//   const config = {
//     onSignIn: () => {
//       window.location.hash = '';
//     },
//     authority: 'https://accounts.google.com',
//     clientId: '1066073673387-undfdseanu1soilcdprq1p4m8gq8a1iu.apps.googleusercontent.com',
//     responseType: 'id_token',
//     redirectUri: 'http://localhost:3000/',
//     autoSignIn: false,
//   };

//   return () => {
//     const cached = useCached();

//     return (
//       <AuthProvider {...config}>
//         <ComponentWithAuth>
//           {(auth) => {
//             cached.set(CONNECTOR_ENUM.GOOGLE, auth);
//             return <ComponentWrapped />;
//           }}
//         </ComponentWithAuth>
//       </AuthProvider>
//     );
//   };
// };

export { withOktaAuth };
