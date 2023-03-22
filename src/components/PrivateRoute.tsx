import { Navigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import CommonStyles from './CommonStyles';

const PrivateRoute = (props: { children: any }) => {
  const auth = useAuth();

  //! Render

  if (auth.loading) {
    return <CommonStyles.Loading />;
  }

  if (auth.isLogged) {
    return props.children;
  }

  return <Navigate to={BaseUrl.Login} replace />;
};

export default PrivateRoute;
