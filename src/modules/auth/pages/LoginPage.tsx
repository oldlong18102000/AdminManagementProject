import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import '../../../scss/login.css';
import { ROUTES } from '../../../configs/routes';
import { push, replace } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { getErrorMessageResponse } from '../../../ultis';
import { fetchAPIsignIn } from '../redux/Action';
import { ILoginParams } from '../model/LoginModel';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../ultis/httpResponseCode';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      try {
        const json = await dispatch(fetchAPIsignIn(values, setLoading))
        if (json.success === RESPONSE_STATUS_UNAUTHORIZED) {
          setErrorMessage(getErrorMessageResponse(json.errors));
        }
      } catch (error: any) {
        // console.log(error)
        //setErrorMessage(getErrorMessageResponse(error.response.data));
      }
    },
    [dispatch],
  );

  const NavigateSignUp = () => {
    dispatch(replace(ROUTES.login));
  }
  return (
    <div className="container display-container">

      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      Bạn chưa có tài khoản?
      <a className="NavigateAuth" onClick={NavigateSignUp}>
        <FormattedMessage id='register' />
      </a>
    </div>
  );
};

export default LoginPage;
