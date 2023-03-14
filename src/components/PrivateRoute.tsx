import { Navigate } from 'react-router-dom';
import BaseUrl from 'constants/baseUrl';
import useAuth from 'hooks/useAuth';

const PrivateRoute = (props: { children: any }) => {
  const auth = useAuth();

  //! Render
  if (auth.isLogged) {
    return props.children;
  }

  return <Navigate to={BaseUrl.Login} replace />;
};

export default PrivateRoute;
