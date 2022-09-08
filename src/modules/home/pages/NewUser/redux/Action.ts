import Cookies from 'js-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../../../configs/api';
import { AppState } from '../../../../../redux/reducer';
import { APIHostConst } from '../../../../../ultis/constants';
import { axiosThunk, fetchThunk } from '../../../../common/redux/thunk';
import { ICreateNewUserParams } from '../model/NewUserModel';


// API Create New Product
export const fetchCreateNewProduct = (state: ICreateNewUserParams) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "email": state.Email,
            "firstName": state.FirstName,
            "lastName": state.LastName,
            "password": state.Password,
            "confirm_password": state.ConfirmPassword,
            "membership_id": state.Membership,
            "paymentRailsType": state.Type,
            "access_level": state.AccessLevel,
            "forceChangePassword": state.ForceChangePassword,
            ...(state.AccessLevel === '100' && { "roles": state.Role.map(val => val.role) }),
            "taxExempt": state.TaxExempt,
        }
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.createNewUserData, 'post', obj));
        return json;
    };
};
