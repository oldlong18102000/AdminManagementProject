import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import styles from './scss/NewProduct.module.css';
import '../ProductTable/scss/TableProduct.css'
import { Select, DatePicker, Tag } from 'antd';
import 'antd/dist/antd.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AsyncSelect from 'react-select/async'
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js"
import { AppState } from '../../../../redux/reducer';
import { IProductDetailParams } from './model/ProductDetailModel';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { fetchProductDetailData } from './redux/Action';
//import ImageUpLoad from '../ImageUpLoad';

const initData = {
    ProductTitle: "",
    Brand: "",
    search: "",
    category: "0",
    stock_status: "all",
    availability: "all",
    vendor: "",
    sort: "name",
    order_by: "ASC",
    search_type: ""
}

const DetailProduct = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    let currentUrl = window.location.pathname
    let result = currentUrl.lastIndexOf("/");
    let idProduct = currentUrl.slice(result + 1, currentUrl.length)
    const Today = new Date().toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" })
    const initSku = new Date().getTime()



    const [inputValue, SetInputValue] = useState('');
    const [selectedValue, SetSelectedValue] = useState(null);
    const [Vendor, setVendor] = useState("");
    const [ProductTitle, setProductTitle] = useState("");
    //const [Brand, SetBrand] = useState("");
    const [Ima, setIma] = useState([]);
    const [Category, SetCategory] = useState([{ category_id: "", name: "" }]);
    const [CategoryName, SetCategoryName] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [Shipping, setShipping] = useState([{ id: "1", price: "0.00", }]);

    const [Country, SetCountry] = useState("");
    const dataDeleteLength = 1;

    const listVendors = useSelector((state: AppState) => (state.services.vendorlist));
    const listCategories = useSelector((state: AppState) => (state.services.categorylist));
    const listBrands = useSelector((state: AppState) => (state.services.brandlist));
    const listCountries = useSelector((state: AppState) => (state.services.countrylist));



    const [state, setState] = useState({
        ProductTitle: "",
        Brand: "",
        Condition: "292",
        editorState: EditorState.createEmpty(),
        SKU: initSku,
        Category: [{ category_id: "", name: "" }],
        ArrivalDate: "165000000",
        Avai4Sale: 1,
        TaxExempt: 0,
        Price: 0,
        Quantity: 0,
        Shipping: [{ id: "1", price: "0.00", }],
        OgTtagsType: "0",
        OgTags: "",
        MetaDescType: "A",
        MetaDescription: "",
        MetaKeywords: "",
        ProductPageTitle: "",
        FacebookMarketingEnabled: 0,
        GoogleFeedEnabled: 0,
    });

    const onChange = (ev: any) => {
        const target = ev.target;
        const id = target.id;
        const value =
            target.type === "checkbox" ? Number(target.checked) : target.value;
        console.log('hayyy', target.checked)
        console.log('ko', target.id)
        setState((prevFields) => ({
            ...prevFields,
            [id]: value,
        }))
    }
    const getProductDeltailData = async () => {
        const res = await dispatch(fetchProductDetailData(idProduct))
        console.log("res", res)
        const datas = res.data
        console.log(datas)
        // Basic
        setVendor(datas.vendor_id)
        //let filtered = listVendors.filter(item => item.id === datas.vendor_id);

        //SetInputValue(filtered.map(item => item.name))
        setProductTitle(datas.name)
        setState((prevFields) => ({
            ...prevFields,
            ProductTitle: datas.name,
            Brand: datas.brand_id,
            Condition: datas.condition_id,
            //editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(datas.description).contentBlocks)),
            SKU: +datas.sku,
            Category: datas.categories,
            ArrivalDate: datas.arrival_date,
            Avai4Sale: +datas.enabled,
            TaxExempt: +datas.tax_exempt,
            Price: +datas.price,
            Quantity: +datas.quantity,
            Shipping: datas.shipping,
            OgTtagsType: datas.og_tags_type,
            OgTags: datas.og_tags,
            MetaDescType: datas.meta_desc_type,
            MetaDescription: datas.meta_description,
            MetaKeywords: datas.meta_keywords,
            ProductPageTitle: datas.product_page_title,
            FacebookMarketingEnabled: +datas.facebook_marketing_enabled,
            GoogleFeedEnabled: +datas.google_feed_enabled,
        }))
    }

    useEffect(() => {
        getProductDeltailData();
    }, [])

    const take_decimal_number = (num: number, n: number) => {
        const index = String(num).indexOf('.', 0);
        const result = String(num).slice(0, index + n + 1);
        return result;
    }

    return (
        <div className="padding-left-293">
            <Link to="/products/manage-product">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>{ProductTitle ? ProductTitle : 'Add Product'}</h2>
                {/* Vendor */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Vendor<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                value={selectedValue}
                                // getOptionLabel={e => e.name}
                                // getOptionValue={e => setVendor(e.id)}
                                // loadOptions={loadOptions}
                                onChange={e => SetSelectedValue(e)}
                                onInputChange={e => SetInputValue(e)}
                                placeholder={inputValue}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#c8c8c8',
                                    },
                                })}
                            />
                            {Vendor === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Product Title */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product Title<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='ProductTitle' onChange={onChange} value={state.ProductTitle}></input>
                            {state.ProductTitle === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Brand */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Brand<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Brand" id="Brand" onChange={onChange} value={state.Brand}>
                                {listBrands && listBrands.length > 0 && listBrands.map((item, index) => {
                                    return (<option key={`brand-${index}`} value={item.id}>{item.name}</option>)
                                })}
                            </select>
                            {state.Brand === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Condition */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Condition<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Condition" id="Condition" onChange={onChange} value={state.Condition}>
                                <option value="292">Used</option>
                                <option value="" style={{ display: 'none' }}></option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* SKU */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>SKU</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='SKU' onChange={onChange} value={state.SKU}></input>
                        </div>
                    </div>
                </div>
                {/* Images chưa set */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Images<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            {/* <ImageUpLoad setIma={setIma} Ima={Ima} /> */}
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Category<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value}`}>
                            <Select id="Category"
                                mode="multiple"
                                allowClear
                                value={(state.Category)?.map(item => '----'.concat(item.name))}
                                style={{ width: '100%', }}
                                placeholder="Type Categories name to select"
                            //onSelect={onchange}
                            >
                                {listCategories && listCategories.length > 0 && listCategories.map((item, index) => {
                                    return (<Select.Option key={`category-${index}`} value={item.id} label={item.id}><Tag>----{item.name}</Tag></Select.Option>)
                                })}
                            </Select>
                        </div>
                    </div>
                    {Category === null ?
                        <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        : null}
                </div>
                {/* Description */}
                {/* <div className={`${styles.form_group} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Description<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value_editor}`}>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={e => { setEditorState(e); setDescription(draftToHtml(convertToRaw(e.getCurrentContent()))) }}
                                toolbar={{
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                }}
                            />
                            <textarea
                                disabled
                                style={{ width: '100%' }}
                                value={Description}
                            />
                        </div>
                    </div>
                    {Description === '' ?
                        <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        : null}
                </div> */}
                {/* Available for sale */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Available for sale</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" id='Avai4Sale' checked={Boolean(state.Avai4Sale)} onChange={onChange} />
                            <span className="slider"></span>
                        </label>
                        <i className="fa-solid fa-circle-question"></i>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Prices & Inventory</h4>
                {/* Memberships */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Memberships</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            {/* <ReactMultiSelectCheckboxes options={[{ "id": 1, "value": "4", "label": "General" }]} onChange={e => setMemberships(...[], (e[0] ? [Number(e[0].value)] : []))} /> */}
                        </div>
                    </div>
                </div>
                {/* Tax Exempt */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Tax class</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>Default</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <input type="checkbox" id="TaxExempt" checked={Boolean(state.TaxExempt)} onChange={onChange} />
                        <label>Tax Exempt</label>
                    </label>
                </div>
                {/* Price */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Price<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" id="Price" placeholder='0.00' onChange={onChange} value={take_decimal_number(state.Price, 2)}></input>
                            {state.Price <= 0 ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field must be greater than 0</div>
                                : null}
                        </div>
                    </label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <input type="checkbox" name="tax_exempt" id="tax_exempt" />
                        <label>Sale</label>
                    </label>
                </div>
                {/* Arrival date */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Arrival date</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            {/* <DatePicker value={moment(new Date(+ArrivalDate * 1000).toLocaleDateString())} format={"YYYY-MM-DD"} onChange={(value) => setArrivalDate(new Date(value).toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" }))}></DatePicker> */}
                        </div>
                    </div>
                </div>
                {/* Quantity in stock */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Quantity in stock<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" id="Quantity" placeholder='0.00' onChange={onChange} value={state.Quantity}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Shipping</h4>
                {/* Shipping */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Continental U.S.<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" id='Shipping' placeholder='0.00' defaultValue={take_decimal_number(+Shipping.filter(item => item.id === '1')[0]?.price, 2)} onChange={e => setShipping(prevState => {
                                const newState = prevState.map(obj => {
                                    if (obj.id === "1") {
                                        return { ...obj, price: `${e.target.value}` };
                                    }
                                    return obj;
                                });

                                return newState;

                            })
                            } autoComplete='off' maxLength={20}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_3}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="country" id="country" onChange={e => SetCountry(e.target.value)}>
                                <option value="0">Select new zone</option>
                                {listCountries && listCountries.length > 0 && listCountries.map((item, index) => {
                                    return (<option key={`country-${index}`} value={item.id}>{item.country}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <label className={` ${styles.col_md_2}`}>Add Shipping Location</label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part4}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Marketing</h4>
                {/* og_tags_type */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Open Graph meta tags</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="OgTtagsType" id="OgTtagsType" value={state.OgTtagsType} onChange={onChange}>
                                <option value="0">Autogenerated</option>
                                <option value="1">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* og_tags */}
                {/* {!hidedenOgTag || OgTtagsType === '1' ? */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.OgTtagsType === '0'}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea id='OgTags' onChange={onChange} value={state.OgTags} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* : null} */}
                {/* MetaDescType */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta description</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="MetaDescType" id="MetaDescType" value={state.MetaDescType} onChange={onChange}>
                                <option value="A">Autogenerated</option>
                                <option value="C">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* MetaDescription */}
                {/* {!hidedenMetaDescription || MetaDescType === 'C' ? */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.MetaDescType === 'A'}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea id='MetaDescription' onChange={onChange} value={state.MetaDescription} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* : null} */}
                {/* MetaKeywords */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta keywords</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='MetaKeywords' onChange={onChange} value={state.MetaKeywords}></input>
                        </div>
                    </div>
                </div>
                {/* ProductPageTitle */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product page title</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='ProductPageTitle' onChange={onChange} value={state.ProductPageTitle}></input>
                            <div className={`${styles.small} ${styles.help_block}`}>Leave blank to use product name as Page Title.</div>
                        </div>
                    </div>
                </div>
                {/* FacebookMarketingEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Facebook <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" id='FacebookMarketingEnabled' checked={Boolean(state.FacebookMarketingEnabled)} onChange={onChange} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                {/* GoogleFeedEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Google <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" id='GoogleFeedEnabled' checked={Boolean(state.GoogleFeedEnabled)} onChange={onChange} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" disabled={+dataDeleteLength === 0 ? true : false}>Update Product</button></li>
                </div>
            </div>
        </div >
    );
}

export default DetailProduct