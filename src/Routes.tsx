import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import HomeRoute from './modules/common/components/HomeRoute';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'))
const NotFoundPage = lazy(() => import('./modules/home/pages/NotFound'))

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <HomeRoute path={ROUTES.login} component={LoginPage} />
        <HomeRoute path={ROUTES.signUp} component={SignUpPage} />
        <ProtectedRoute path={ROUTES.contact} component={ContactPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />

        <HomeRoute exact path="/" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
