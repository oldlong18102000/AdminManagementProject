import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ROUTES } from '../../../configs/routes';
import { push, replace } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { moveCursor } from 'readline';
import { RESPONSE_STATUS_SUCCESS } from '../../../ultis/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import { getErrorMessageResponse } from '../../../ultis';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >

      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      Bạn chưa có tài khoản?
      <a onClick={() => dispatch(replace(ROUTES.signUp))} style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>
        <FormattedMessage id='register' />
      </a>
    </div>
  );
};

export default LoginPage;
