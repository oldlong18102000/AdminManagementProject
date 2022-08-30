export interface IProductDetailParams {
    brand_id: string;
    name: string;
    // id: string;
    // vendor_id: string;
    // sku: string;
    // sort_description: string;
    // description: string;
    // enabled: string;
    // quantity: string;
    // price: string;
    // participate_sale: string;
    // sale_price: string;
    // tax_exempt: string;
    // arrival_date: string;
    // facebook_marketing_enabled: string;
    // google_feed_enabled: string;
    // og_tags_type: string;
    // meta_desc_type: string;
    // meta_keywords: string;
    // meta_description: string;
    // product_page_title: string;
    // shipping: Array<{ id: string, zone_name?: string, price: string }>
    // og_tags: string;
    // condition_id: string;
    // categories: Array<{ category_id: string, name: string }>
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
}
