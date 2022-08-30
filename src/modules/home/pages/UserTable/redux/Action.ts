import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../../../configs/api';
import { ROUTES } from '../../../../../configs/routes';
import { AppState } from '../../../../../redux/reducer';
import { ACCESS_TOKEN_KEY, APIHost2, APIHostConst } from '../../../../../ultis/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../ultis/httpResponseCode';
import { setUserInfo } from '../../../../auth/redux/Action';
import { axiosThunk } from '../../../../common/redux/thunk';
import { IUserFilterParams } from '../model/UserTableModel';


// API Fetch User Data
export const fetchUserData = (values: IUserFilterParams) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "page": values.page,
            "count": values.count,
            "search": values.search,
            "memberships": values.memberships,
            "types": values.types,
            "status": values.status,
            "country": values.country,
            "state": values.state,
            "address": values.address,
            "phone": values.phone,
            "date_type": values.date_type,
            "date_range": values.date_range,
            "sort": values.sort,
            "order_by": values.order_by,
            "tz": 7
        }
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getUserListData, 'post', obj));
        return json;
    };
};

// API Delete User Data
export const deleteUserDataAPI = (arr: Array<String>) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            params: arr.map((item) => { return ({ id: item, delete: 1 }) })
        }
        console.log("obj", obj)
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.deleteUserData, 'post', obj));

    };
};
