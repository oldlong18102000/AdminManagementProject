import Cookies from 'js-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../../../configs/api';
import { AppState } from '../../../../../redux/reducer';
import { APIHostConst } from '../../../../../ultis/constants';
import { axiosThunk, fetchThunk } from '../../../../common/redux/thunk';


// API Fetch Product Data
export const fetchProductDetailData = (id: String) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "id": id,
        }
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getProductDetailData, 'post', obj));
        return json;
    };
};
