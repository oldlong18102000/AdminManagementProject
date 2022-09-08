import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './scss/NewProduct.module.css';
import '../ProductTable/scss/TableProduct.css'
import 'antd/dist/antd.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AsyncSelect from 'react-select/async'
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js"
import { AppState } from '../../../../redux/reducer';
import { IListCategories, IListVendors, IProductDetailParams } from '../ProductDetail/model/ProductDetailModel';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { fetchProductDetailData } from './redux/Action';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { OperationCanceledException, preProcessFile } from 'typescript';
import { includes, map } from 'lodash';
import { setCountry } from '../../../../services/Action';
import { object } from 'yup';

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

const NewProduct = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    let currentUrl = window.location.pathname
    let result = currentUrl.lastIndexOf("/");
    let idProduct = currentUrl.slice(result + 1, currentUrl.length)
    const Today = new Date().toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" })
    const initSku = new Date().getTime()



    const [selectedValue, SetSelectedValue] = useState(null);
    const [Vendor, setVendor] = useState("");
    const [inputValue, setInputValue] = useState<IListVendors | null>();
    const [ProductTitle, setProductTitle] = useState("");
    //const [Brand, SetBrand] = useState("");
    const [Ima, setIma] = useState([]);
    const [Category, SetCategory] = useState([{ category_id: "", name: "" }]);
    const [CategoryName, SetCategoryName] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [Shipping, setShipping] = useState([{ id: "1", price: "0.00", }]);
    const [option, setOption] = useState('')
    const [Country, SetCountry] = useState<string[]>([]);
    const dataDeleteLength = 1;

    const listVendors = useSelector((state: AppState) => (state.services.vendorlist));
    const listCategories = useSelector((state: AppState) => (state.services.categorylist));
    const listBrands = useSelector((state: AppState) => (state.services.brandlist));
    const listCountries = useSelector((state: AppState) => (state.services.countrylist));

    const [imageList, setImageList] = useState<any[]>([])

    const [state, setState] = useState({
        Vendor: "",
        ProductTitle: "",
        Brand: "",
        Condition: "292",
        editorState: EditorState.createEmpty(),
        SKU: initSku,
        imageList: [{ thumbs: '', file: [] as any[] }],
        Category: [{ id: "", name: "" }],
        ArrivalDate: new Date().getTime(),
        Avai4Sale: 1,
        TaxExempt: 0,
        Price: 0,
        participate_sale: 0,
        sale_price_type: '$',
        sale_price: 0,
        Quantity: 0,
        Shipping: [{ id: "1", zone_name: "Continental U.S.", price: 0 }],
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
        setState((prevFields) => ({
            ...prevFields,
            [id]: value,
        }))
        if (target.type === "checkbox" && id == 'participate_sale' && target.checked == false) {
            setState((prevFields) => ({
                ...prevFields,
                sale_price: 0,
            }))
        }
    }

    const take_decimal_number = (num: number, n: number) => {
        const index = String(num).indexOf('.', 0);
        const result = String(num).slice(0, index + n + 1);
        return result;
    }

    const handleOnChangeAutocomplete = (newValue: IListVendors) => {
        setInputValue(newValue);
        setVendor(newValue?.id ? newValue.id : "");
    }


    const handleChange = (newValue: Date | null) => {
        //setValue(newValue);
        setState((prevFields) => ({
            ...prevFields,
            ArrivalDate: newValue!.getTime(),
        }))
        console.log("@@", newValue!.toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" }))
    };

    const handleAddShipping = () => {
        SetCountry([...Country, option]);
        setOption('');
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
                            <Autocomplete
                                disablePortal
                                options={listVendors}
                                value={inputValue}
                                onChange={(event, newValue) => handleOnChangeAutocomplete(newValue!)}
                                sx={{
                                    display: 'inline-block',
                                    '& input': {
                                        width: 500,
                                        bgcolor: 'background.paper',
                                        color: (theme) =>
                                            theme.palette.getContrastText(theme.palette.background.paper),
                                    },
                                }}
                                style={{ "width": '384.53px' }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                            {inputValue === null ?
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
                            {state.imageList.map((file, index) => <img key={index} src={file.thumbs[0]} style={{ "width": "122px", "height": "122px" }} />)}
                            {imageList.map((file, index) => <img key={index} src={URL.createObjectURL(file)} style={{ "width": "122px", "height": "122px" }} />)}
                            <input type='file' multiple accept="image/*" onChange={(event) => {
                                console.log(event.target.files);
                                setImageList((prev) => {
                                    if (event.target.files) {
                                        return [...prev, ...Array.from(event.target.files)]
                                    }
                                    return [...prev];
                                })
                            }} />
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Category<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value}`} style={{ "backgroundColor": "white" }}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={listCategories}
                                getOptionLabel={(option: any) => option.name}
                                value={state.Category}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        color="primary"
                                        variant="filled"
                                    />
                                )}
                                onChange={(_: any, value: any) => {
                                    setState(prev => {
                                        return {
                                            ...prev,
                                            Category: value.map((val: any) => ({ id: val.id, name: val.name }))
                                        }

                                    })
                                }}
                            />
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
                        <div className={` ${styles.table_value}`} style={{ "backgroundColor": "white" }}>
                            {/* <ReactMultiSelectCheckboxes options={[{ "id": 1, "value": "4", "label": "General" }]} onChange={e => setMemberships(...[], (e[0] ? [Number(e[0].value)] : []))} /> */}
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={[{ "id": 1, "value": "4", "label": "General" }]}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox checked={selected} />
                                        {option.label}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
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
                            <input type="number" min={0} id="Price" placeholder='0.00' onChange={onChange} value={take_decimal_number(state.Price, 2)}></input>
                            {state.Price <= 0 ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field must be greater than 0</div>
                                : null}
                        </div>
                    </label>
                    <label className={` ${styles.col_md_1}`} style={{ textAlign: 'left' }}>
                        <input type="checkbox" id="participate_sale" checked={Boolean(state.participate_sale)} onChange={onChange} />
                        <label>Sale</label>
                    </label>
                    <label className={` ${styles.col_md_1}`} style={{ textAlign: 'left' }} hidden={state.participate_sale == 0}>
                        <div className={` ${styles.table_value} ${styles.fitcontent}`}>
                            <select name="sale_price_type" id="sale_price_type" onChange={onChange} value={state.sale_price_type}>
                                <option value="$">$</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }} hidden={state.participate_sale == 0}>
                        <div className={` ${styles.table_value} ${styles.fitcontent}`}>
                            <input type="number" min={0} id="sale_price" placeholder='0.00' onChange={onChange} value={state.sale_price}></input>
                        </div>
                    </label>
                </div>
                {/* Arrival date */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Arrival date</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            {/* <DatePicker value={moment(new Date(+ArrivalDate * 1000).toLocaleDateString())} format={"YYYY-MM-DD"} onChange={(value) => setArrivalDate(new Date(value).toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" }))}></DatePicker> */}
                            <div >
                                <DesktopDatePicker
                                    inputFormat="yyy-MM-dd"
                                    value={new Date(+state.ArrivalDate)}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quantity in stock */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Quantity in stock<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" min={0} id="Quantity" placeholder='0.00' onChange={onChange} value={state.Quantity}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Shipping</h4>
                {state.Shipping && state.Shipping.length > 0 && state.Shipping.map((item, index) => {
                    return (
                        <div key={`country${index}`} className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                            <label className={` ${styles.col_md_2}`}>{item.zone_name}<span hidden={item.zone_name != 'Continental U.S.'} className={`${styles.text_danger}`}>*</span></label>
                            <div className={` ${styles.col_md_4}`}>
                                <div className={` ${styles.table_value}`}>
                                    <input type="number" min={0} id='Shipping' value={item.price} placeholder='0.00' onChange={(e) =>
                                        setState((prevFields) => (
                                            {
                                                ...prevFields,
                                                Shipping: prevFields.Shipping.map(el => (el.zone_name == item.zone_name ? { ...el, price: +e.target.value } : el))
                                            }
                                        ))
                                    }></input>
                                </div>
                            </div>
                            <label className={` ${styles.pointer}`} hidden={item.zone_name == 'Continental U.S.'}
                                onClick={() =>
                                    setState((prevFields) => (
                                        { ...prevFields, Shipping: prevFields.Shipping.filter(obj => { return obj.zone_name != item.zone_name }) }
                                    ))}
                            >Remove</label>
                        </div>
                    )
                })}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_3}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="country" id="country" onChange={e => setOption(e.target.value)} value={option}>
                                <option value="">Select new zone</option>
                                {listCountries && listCountries.length > 0 && listCountries.filter(item => !state.Shipping.map(val => val.zone_name).includes(item.country)).map((item, index) => {
                                    return (<option key={`country-${index}`} value={item.country}>{item.country}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <label className={` ${styles.col_md_2} ${styles.pointer}`} onClick={() => option != '' &&
                        setState((prevFieds) => ({ ...prevFieds, Shipping: [...prevFieds.Shipping, { id: listCountries.filter(oba => { return oba.country == option }).map(obj => obj.id).toString(), zone_name: option, price: 0.00, }] }))
                    }>Add Shipping Location</label>
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
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.OgTtagsType === '0'}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea id='OgTags' onChange={onChange} value={state.OgTags} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
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
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.MetaDescType === 'A'}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea id='MetaDescription' onChange={onChange} value={state.MetaDescription} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
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
                    <li><button type="button" className="btn btn-warning" disabled={+dataDeleteLength === 0 ? true : false}>Add Product</button></li>
                </div>
            </div>
        </div >
    );
}

export default NewProduct