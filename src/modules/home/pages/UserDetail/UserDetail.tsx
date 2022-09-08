import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import '../ProductTable/scss/TableProduct.css'
import styles from './scss/NewUser.module.css';
import 'antd/dist/antd.css';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { fetchUpdateProduct, fetchUserDetailData } from './redux/Action';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { IRoleParams } from '../NewUser/model/NewUserModel';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';

const listRoles = [
    { label: 'Administrator', role: "1" },
    { label: 'Coupons management', role: "2" },
    { label: 'Content management', role: "3" },
    { label: 'Volume discounts managenment', role: "4" },
    { label: 'Vendor', role: "5" },
    { label: 'View order reports', role: "6" },
]

const initData = {
    vendorIncome: "",
    vendorExpense: "",
    earning: "",
    orderAsBuyer: { quantity: 0, total: "0.00" },
    productTotal: "",
    companyName: "",
    joined: "",
    lastLogin: "",
    language: "",
    referer: "",
    paymentType: "",
    paymentId: "",
    accessLevel: "10",
    role: [] as IRoleParams[],
    status: "E",
    statusComment: "",
    pending: "",
    forceChangePassword: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    cfPassword: "",
    membership: "4",
    Type: "individual",
    taxExempt: 0,
}

const DetailUser = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    let currentUrl = window.location.pathname
    let result = currentUrl.lastIndexOf("/");
    let idUser = currentUrl.slice(result + 1, currentUrl.length)
    const [orderAsBuyer, setOrderAsBuyer] = useState({ quantity: 0, total: "0.00" });
    const [pending, setPending] = useState("");

    const [state, setState] = useState(initData)

    const getUserDeltailData = async () => {
        const res = await dispatch(fetchUserDetailData(idUser))
        console.log(res)
        console.log(res.data.info)
        const info = res.data.info
        setState((prevFields) => ({
            ...prevFields,
            companyName: info.companyName,
            orderAsBuyer: { ...prevFields.orderAsBuyer, quantity: info.order_as_buyer, total: info.order_as_buyer_total },
            vendorIncome: info.income,
            vendorExpense: info.expense,
            earning: info.earning,
            productTotal: info.products_total,
            joined: new Date(info.joined * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }),
            lastLogin: new Date(info.last_login * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }),
            language: info.language,
            referer: info.referer,
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            paymentType: info.paymentRailsType,
            paymentId: info.paymentRailsId,
            accessLevel: info.access_level,
            role: info?.roles.map((val: string) => listRoles.filter((roles) => val == roles.role)[0]),
            status: info.status,
            statusComment: info.statusComment,
            membership: info.membership_id ? info.membership_id : '',
            pending: info.pending_membership_id,
            forceChangePassword: +info.forceChangePassword,
            taxExempt: +info.taxExempt,
        }))
    }

    useEffect(() => {
        getUserDeltailData();
    }, [])

    const take_decimal_number = (num: number, n: number) => {
        const index = String(num).indexOf('.', 0);
        const result = String(num).slice(0, index + n + 1);
        return result;
    }

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

    const updateUser = async () => {
        const stateAPI = {
            "email": state.email,
            "firstName": state.firstName,
            "lastName": state.lastName,
            "password": state.password,
            "confirm_password": state.cfPassword,
            "membership_id": state.membership,
            "forceChangePassword": state.forceChangePassword,
            "taxExempt": state.taxExempt,
            "id": idUser,
            "roles": state.role.map(val => +val.role),
            "status": state.status,
            "statusComment": state.statusComment,
        }
        const res = await dispatch(fetchUpdateProduct(stateAPI))
        console.log('res', res)
        res.success === false ?
            console.log('error', res.error) :
            dispatch(replace(ROUTES.userTable))
    }

    return (
        <div className="padding-left-293">
            <Link to="/user/manage-user">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>{state.email} ({state.companyName})</h2>
                {/* Orders placed as a buyer */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Orders placed as a buyer</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span style={{ color: '#007bff' }}>{orderAsBuyer.quantity}</span><span> (${take_decimal_number(+state.orderAsBuyer.total, 2)})</span>
                        </div>
                    </div>
                </div>
                {/* Vendor Income */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Vendor Income</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${state.vendorIncome}</span>
                        </div>
                    </div>
                </div>
                {/* Vendor Expense */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Vendor Expense</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${state.vendorExpense}</span>

                        </div>
                    </div>
                </div>
                {/* View transaction details */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}><a href='#'>View transaction details</a></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                        </div>
                    </div>
                </div>
                {/* earning balance */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>earning balance</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${state.earning}</span>
                        </div>
                    </div>
                </div>
                {/* Products listed as vendor */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Products listed as vendor</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <a href='#'>{state.productTotal}</a>
                        </div>
                    </div>
                </div>
                {/* joined */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>joined</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.joined}</span>
                        </div>
                    </div>
                </div>
                {/* Last login */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Last login</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.lastLogin}</span>
                        </div>
                    </div>
                </div>
                {/* language */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>language</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.language}</span>
                        </div>
                    </div>
                </div>
                {/* referer */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>referer</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.referer}</span>
                        </div>
                    </div>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Email & password</h4>
                {/* First Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>First Name<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='firstName' value={state.firstName} onChange={onChange}></input>
                            {state.firstName === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Last Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Last Name<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='lastName' value={state.lastName} onChange={onChange}></input>
                            {state.lastName === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Email<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='email' value={state.email} onChange={onChange}></input>
                            {state.email === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Password</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="password" id='password' value={state.password} onChange={onChange}></input>
                        </div>
                    </div>
                </div>
                {/* Confirm password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Confirm password</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="password" id='cfPassword' value={state.cfPassword} onChange={onChange}></input>
                            {state.cfPassword !== state.password ?
                                <div className={`${styles.small} ${styles.error_message}`}>Passwords do not match</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Type */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Type</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.paymentType}</span>
                        </div>
                    </div>
                </div>
                {/* PaymentRails ID */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>PaymentRails ID</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.paymentId}</span>
                        </div>
                    </div>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Access information</h4>
                {/* Access level */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Access level</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.accessLevel === "100" ? "Administrator" : "Vendor"}</span>
                        </div>
                    </div>
                </div>
                {/* Roles */ console.log('role', state.role)}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.accessLevel !== '100'}>
                    <label className={` ${styles.col_md_3}`}>Roles</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={styles.table_value}>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={listRoles}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                value={state.role}
                                onChange={(event, newValue) => setState((prevFields) => ({
                                    ...prevFields,
                                    role: newValue,
                                }))}
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
                {/* Account status */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Account status<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="status" id="status" value={state.status} onChange={onChange}>
                                <option value="E">Enable</option>
                                <option value="D">Disable</option>
                                <option value="U">Unapproved Vendor</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* status comment (reason) */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>status comment (reason)</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea name='statusComment' id='statusComment' value={state.statusComment} onChange={onChange} style={{ width: '100%', minHeight: '64px', color: 'black', fontSize: '14px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>membership</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="membership" id="membership" value={state.membership} onChange={onChange}>
                                <option value=''>Ignore membership</option>
                                <option value="4">General</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* pending membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Pending membership</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{state.pending === null ? "None" : pending}</span>
                        </div>
                    </div>
                </div>
                {/* Require to change password on next log in */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Require to change password on next log in</label>
                    <label className={` ${styles.col_md_3}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" id='forceChangePassword' checked={Boolean(state.forceChangePassword)} onChange={onChange}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part4}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Tax information</h4>
                {/* TaxExempt */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Tax exempt</label>
                    <label className={` ${styles.col_md_3}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" id='taxExempt' checked={Boolean(state.taxExempt)} onChange={onChange}></input>
                        </div>
                    </label>
                </div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" onClick={updateUser}
                        disabled={false}>Update</button></li>
                </div>
            </div>
        </div >
    );
}

export default DetailUser