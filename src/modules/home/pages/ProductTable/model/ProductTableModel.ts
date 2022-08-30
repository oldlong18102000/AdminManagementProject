export interface IProductTableParams {
    id: string;
    sku: string;
    price: string;
    category: string;
    amount: string;
    name: string;
    vendor: string;
    arrivalDate: string;
}

export interface IProductFilterParams {
    page: number;
    count: number;
    search: string;
    category: string;
    stock_status: string;
    availability: string;
    vendor: string;
    sort: string;
    order_by: string;
    search_type: string

}

export interface IListCategories {
    id: string;
    name: string;
}

export interface IListVendors {
    id: string;
    name: string;
}

export interface IListBrand {
    id: string;
    name: string;
}

export interface IListCountry {
    id: string;
    country: string;
    code: string;
}

export interface Props {
    handleSort(values: string): void;
    ProductList: Array<IProductTableParams>;
    handleSetDeleteList(e: any): void;
}

export interface PropsModalConfirm {
    show: Boolean,
    handleClose: void,
    dataProductDelete: Array<String>,
    handleOpacity: void,
    setDataProductDelete: void,
    handleFetchData: void,
    setDataDeleteLength: void
}