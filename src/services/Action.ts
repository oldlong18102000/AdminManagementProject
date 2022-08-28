import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../configs/api';
import { axiosThunk, fetchThunk } from '../modules/common/redux/thunk';
import { IListBrand, IListCategories, IListCountry, IListVendors } from '../modules/home/pages/ProductTable/model/ProductTableModel';
import { AppState } from '../redux/reducer';
import { ACCESS_TOKEN_KEY, APIHostConst } from '../ultis/constants';
import { RESPONSE_STATUS_SUCCESS } from '../ultis/httpResponseCode';

export const setCategories = createCustomAction('services/setCategories', (data: IListCategories) => ({
    data,
}));

export const setVendor = createCustomAction('services/setVendor', (data: IListVendors) => ({
    data,
}));

export const setBrand = createCustomAction('services/setBrand', (data: IListBrand) => ({
    data,
}));

export const setCountry = createCustomAction('services/setCountry', (data: IListCountry) => ({
    data,
}));

// API GetCategory
export const fetchAPIgetCategory = () => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(API_PATHS.getCategory, 'get'))
        dispatch(setCategories(json.data));
        return json.data;
    };
};

// API GetVendor
export const fetchAPIgetVendor = () => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getVendor, 'get', {
            headers: {
                Authorization: Cookies.get(ACCESS_TOKEN_KEY) || ''
            }
        }))
        dispatch(setVendor(json.data.map((val: any) => {
            return {
                id: val.id,
                name: val.name
            }
        })));
        return json.data;
    };
};

// API GetBrands
export const fetchAPIgetBrands = () => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getBrand, 'get', {
            headers: {
                Authorization: Cookies.get(ACCESS_TOKEN_KEY) || ''
            }
        }))
        dispatch(setBrand(json.data));
        return json.data;
    };
};

// API GetCountry
export const fetchAPIgetCountry = () => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const json = await dispatch(axiosThunk(APIHostConst + API_PATHS.getCountry, 'get', {
            headers: {
                Authorization: Cookies.get(ACCESS_TOKEN_KEY) || ''
            }
        }))
        dispatch(setCountry(json.data.map((val: any) => {
            return {
                id: val.id,
                country: val.country
            }
        })));
        return json.data;
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