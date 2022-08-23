import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';

interface Props extends RouteProps { }

const HomeRoute = (props: Props) => {
    const { ...rest } = props;
    const auth = Cookies.get(ACCESS_TOKEN_KEY);

    if (auth) {
        return (
            <Redirect
                to={{
                    pathname: ROUTES.productTable,
                }}
            />
        );
    }

    return <Route {...rest} />;
};

export default HomeRoute;
