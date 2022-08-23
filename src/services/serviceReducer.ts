import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IListBrand, IListCategories, IListCountry, IListVendors } from '../modules/home/pages/ProductTable/model/ProductTableModel';
import { setCategories, setVendor, setBrand, setCountry } from './Action'

export interface ServiceState {
    categorylist: IListCategories[];
    vendorlist: IListVendors[];
    brandlist: IListBrand[];
    countrylist: IListCountry[];
}

const actions = { setCategories, setVendor, setBrand, setCountry };

type Action = ActionType<typeof actions>;

export default function reducer(state: ServiceState = { categorylist: [], vendorlist: [], brandlist: [], countrylist: [] }, action: Action) {
    switch (action.type) {
        case getType(setCategories):
            return { ...state, categorylist: action.data };
        case getType(setVendor):
            return { ...state, vendorlist: action.data };
        case getType(setBrand):
            return { ...state, brandlist: action.data };
        case getType(setCountry):
            return { ...state, countrylist: action.data };
        default:
            return state;
    }
}
