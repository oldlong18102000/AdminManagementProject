import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AuthToken, IUser } from '../../../models/user';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../ultis/httpResponseCode';
import { fetchThunk, axiosThunk } from '../../common/redux/thunk';
import { ILoginParams } from '../model/LoginModel';
import { ISignUpParams } from '../model/SignUpModel';

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
    data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
    data,
}));


// API SignIn
export const fetchAPIsignIn = (values: ILoginParams, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        //setLoading(true);
        const json = await dispatch(axiosThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }));
        //setLoading(false);
        if (json?.success === RESPONSE_STATUS_SUCCESS) {
            dispatch(setUserInfo(json.user));
            dispatch(setAuthorization(json.user_cookie));
            Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined });
            dispatch(replace(ROUTES.productTable));
            return;
        }

        return json;
    };
};

// API SignUp
export const fetchAPIsignUp = (values: ISignUpParams, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        setLoading(true);
        const json = await dispatch(axiosThunk(API_PATHS.signUp, 'post', values))
        setLoading(false);
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            alert('Chúc mừng bạn đăng ký thành công')
            dispatch(replace(ROUTES.login));
            return;
        }
        return json;
    };
};

// API GetLocation
export const fetchAPIgetLocation = (setLocations: React.Dispatch<React.SetStateAction<any>>) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(API_PATHS.getLocation, 'get'))
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLocations(json.data);
            return;
        }
        return json;
    };
};

// API GetState
export const fetchAPIgetState = (id: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(`${API_PATHS.getStateByLocation}${id}`, 'get'));
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setState(json.data);
            return;
        }
        return json;
    };
};