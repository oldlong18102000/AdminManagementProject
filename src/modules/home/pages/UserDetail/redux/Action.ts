import Cookies from 'js-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../../../configs/api';
import { AppState } from '../../../../../redux/reducer';
import { APIHostConst } from '../../../../../ultis/constants';
import { axiosThunk, fetchThunk } from '../../../../common/redux/thunk';
import { IUpdateUserParams } from '../model/ProductDetailModel';

// API Fetch User Data
export const fetchUserDetailData = (id: String) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "id": id,
        }
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getUserDetailData, 'post', obj));
        return json;
    };
};

// API Update Product
export const fetchUpdateProduct = (state: IUpdateUserParams) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "params": [
                {
                    "email": state.email,
                    "firstName": state.firstName,
                    "lastName": state.lastName,
                    "password": state.password,
                    "confirm_password": state.confirm_password,
                    "membership_id": state.membership_id,
                    "forceChangePassword": state.forceChangePassword,
                    "taxExempt": state.taxExempt,
                    "id": state.id,
                    "roles": state.roles,
                    "status": state.status,
                    "statusComment": state.statusComment,
                }
            ]
            // "email": state.Email,
            // "firstName": state.FirstName,
            // "lastName": state.LastName,
            // "password": state.Password,
            // "confirm_password": state.ConfirmPassword,
            // "membership_id": state.Membership,
            // "paymentRailsType": state.Type,
            // "access_level": state.AccessLevel,
            // "forceChangePassword": state.ForceChangePassword,
            // ...(state.AccessLevel === '100' && { "roles": state.Role.map(val => val.role) }),
            // "taxExempt": state.TaxExempt,
        }
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.updateUserData, 'post', obj));
        return json;
    };
};
