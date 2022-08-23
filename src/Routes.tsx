import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import HomeRoute from './modules/common/components/HomeRoute';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ProductTablePage = lazy(() => import('./modules/home/pages/ProductTable/ProductTable'));
const ProductDetailPage = lazy(() => import('./modules/home/pages/ProductDetail/ProductDetail'));
const Header = lazy(() => import('./modules/common/components/Header'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('./modules/home/pages/NotFound'));

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <HomeRoute path={ROUTES.login} component={LoginPage} />
        <HomeRoute path={ROUTES.signUp} component={SignUpPage} />
        <ProtectedRoute path={ROUTES.productTable}><Header /><ProductTablePage /></ProtectedRoute>
        <ProtectedRoute exact path={ROUTES.productDetail}><Header /><ProductDetailPage /></ProtectedRoute>
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <HomeRoute exact path="/" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
