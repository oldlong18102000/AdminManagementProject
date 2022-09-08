import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import '../ProductTable/scss/TableProduct.css'
import styles from './scss/NewUser.module.css';
import 'antd/dist/antd.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { fetchCreateNewProduct } from './redux/Action';
import { push, replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { IRoleParams } from './model/NewUserModel';

const listRoles = [
    { label: 'Administrator', role: "1" },
    { label: 'Coupons management', role: "2" },
    { label: 'Content management', role: "3" },
    { label: 'Volume discounts managenment', role: "4" },
    { label: 'Vendor', role: "5" },
    { label: 'View order reports', role: "6" },
]


const NewUser = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Membership, setMembership] = useState("");
    const [Type, setType] = useState("individual");
    const [AccessLevel, setAccessLevel] = useState("10");
    const [ForceChangePassword, setForceChangePassword] = useState(0);
    const [TaxExempt, setTaxExempt] = useState(0);
    const dataDeleteLength = 1;

    const [state, setState] = useState({
        Email: "",
        FirstName: "",
        LastName: "",
        Password: "",
        ConfirmPassword: "",
        Membership: "",
        Type: "individual",
        Role: [] as IRoleParams[],
        AccessLevel: "10",
        ForceChangePassword: 0,
        TaxExempt: 0,
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
        id === 'AccessLevel' && value === '100' ?
            setState((prevFields) => ({
                ...prevFields,
                Role: [...prevFields.Role, listRoles[0]],
            })) :
            setState((prevFields) => ({
                ...prevFields,
                Role: [],
            }))
    }

    // const loadOptions = async (inputText, callback) => {
    //     const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/vendors/list",
    //         { search: `${inputText}` }
    //         ,
    //         {
    //             headers: {
    //                 Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
    //             }

    //         }
    //     );
    //     const data = res.data && res.data.data ? res.data.data : []
    //     callback(data.map(i => ({ id: i.id, name: i.name })));
    // }

    const createNewUser = async () => {
        const res = await dispatch(fetchCreateNewProduct(state))
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
                <h4 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>Create profile</h4>
                <h6 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Email & password</h6>
                {/* First Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>First Name<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='FirstName' onChange={onChange}></input>
                            {state.FirstName === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Last Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Last Name<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='LastName' onChange={onChange}></input>
                            {state.LastName === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Email<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" id='Email' onChange={onChange}></input>
                            {state.Email === '' ?
                                <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Password<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="password" id='Password' onChange={onChange}></input>
                        </div>
                    </div>
                </div>
                {/* Confirm password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Confirm password<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="password" id='ConfirmPassword' onChange={onChange}></input>
                            {state.ConfirmPassword !== state.Password ?
                                <div className={`${styles.small} ${styles.error_message}`}>Passwords do not match</div>
                                : null}
                        </div>
                    </div>
                </div>
                {/* Type */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Type<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Type" id="Type" onChange={onChange} defaultValue="individual">
                                <option value="individual">Individual</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* PaymentRails ID */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>PaymentRails ID</label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Access information</h4>
                {/* Access level */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Access level<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Type" id="AccessLevel" onChange={onChange} defaultValue="10">
                                <option value="100">Admin</option>
                                <option value="10">Vendor</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Roles */ console.log('role', state.Role.map(val => val.role))}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`} hidden={state.AccessLevel !== '100'}>
                    <label className={` ${styles.col_md_2}`}>Roles</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={styles.table_value}>
                            {/* <select name="Type" id="AccessLevel" onChange={onChange} defaultValue="10">
                                <option value="100">Admin</option>
                                <option value="10">Vendor</option>
                            </select> */}
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={listRoles}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                value={state.Role}
                                onChange={(event, newValue) => setState((prevFields) => ({
                                    ...prevFields,
                                    Role: newValue,
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
                {/* Membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Membership<span>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Membership" id="Membership" onChange={onChange} defaultValue="">
                                <option value="">Ignore Membership</option>
                                <option value="4">General</option>
                            </select>

                        </div>
                    </div>
                </div>
                {/* Require to change password on next log in */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Require to change password on next log in</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" id='ForceChangePassword' onChange={onChange}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Tax information</h4>
                {/* TaxExempt */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Tax exempt</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" id='TaxExempt' onChange={onChange}></input>
                        </div>
                    </label>
                </div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" onClick={createNewUser}
                        disabled={false}>Create account</button></li>
                </div>
            </div>
        </div >
    );
}

export default NewUser