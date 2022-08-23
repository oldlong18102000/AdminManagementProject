import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, createCustomAction } from 'typesafe-actions';
import { API_PATHS } from '../../../../../configs/api';
import { ROUTES } from '../../../../../configs/routes';
import { AppState } from '../../../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../../../ultis/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../ultis/httpResponseCode';
import { setUserInfo } from '../../../../auth/redux/Action';
import { axiosThunk } from '../../../../common/redux/thunk';
import { IProductFilterParams, IProductTableParams } from '../model/ProductTableModel';


// API Fetch Product Data
export const fetchProductData = (values: IProductFilterParams) => {
    return async (dispatch: ThunkDispatch<AppState, null, Action<string>>) => {
        const obj = {
            "page": values.page,
            "count": values.count,
            "search": values.search,
            "category": values.category,
            "stock_status": values.stock_status,
            "availability": values.availability,
            "vendor": values.vendor,
            "sort": values.sort,
            "order_by": values.order_by,
            "search_type": values.search_type,
        }
        const json = await dispatch(axiosThunk(API_PATHS.getProductListData, 'post', obj));
        return json;
    };
};
