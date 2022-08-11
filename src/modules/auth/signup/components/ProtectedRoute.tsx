import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../ultis/constants';
import { ROUTES } from '../../../../configs/routes';

interface Props extends RouteProps { }

const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  if (auth) {
    return <Route {...rest} />;
  }

  return (
    <Navigate
      to={{
        pathname: ROUTES.login,
      }}
    />
  );
};

export default ProtectedRoute;
