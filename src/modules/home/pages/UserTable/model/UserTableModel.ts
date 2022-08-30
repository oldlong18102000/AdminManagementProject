export interface Props {
    handleSort(values: string): void;
    UserList: Array<IUserTableParams>;
    handleSetDeleteList(e: any): void;
}

export interface IUserTableParams {
    profile_id: string,
    vendor: string,
    fistName: string,
    lastName: string,
    created: string,
    last_login: string,
    access_level: string,
    vendor_id: string,
    storeName: string,
    product: number,
    order: {
        order_as_buyer: number,
        order_as_buyer_total: number
    },
    wishlist: string
}

export interface IUserFilterParams {
    page: number,
    count: number,
    search: string,
    country: string,
    memberships: any,
    types: any,
    status: any,
    state: string,
    address: string,
    phone: any,
    date_type: string,
    date_range: any,
    sort: string,
    order_by: string,
}