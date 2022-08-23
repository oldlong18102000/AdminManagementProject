import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import { fetchThunk, axiosThunk } from '../../common/redux/thunk';


// Logout
export const logOut = () => {
    return (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        console.log('here')
        Cookies.remove(ACCESS_TOKEN_KEY)
        dispatch(replace(ROUTES.login))
    };
};
