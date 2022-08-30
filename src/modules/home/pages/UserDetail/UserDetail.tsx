import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import styles from './scss/NewUser.module.css';
import 'antd/dist/antd.css';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { fetchUserDetailData } from './redux/Action';

const DetailUser = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    let currentUrl = window.location.pathname
    let result = currentUrl.lastIndexOf("/");
    let idUser = currentUrl.slice(result + 1, currentUrl.length)
    const [CompanyName, setCompanyName] = useState("");
    const [OrderAsBuyer, setOrderAsBuyer] = useState({ quantity: 0, total: "0.00" });
    const [VendorIncome, setVendorIncome] = useState("");
    const [VendorExpense, setVendorExpense] = useState("");
    const [Earning, setEarning] = useState("");
    const [ProductTotal, setProductTotal] = useState("");
    const [Joined, setJoined] = useState("");
    const [LastLogin, setLastLogin] = useState("");
    const [Language, setLanguage] = useState("");
    const [Referer, setReferer] = useState("");
    const [PaymentType, setPaymentType] = useState("");
    const [PaymentId, setPaymentId] = useState("");
    const [AccessLevel, setAccessLevel] = useState("10");
    const [Status, setStatus] = useState("E");
    const [Pending, setPending] = useState("");
    const [ForceChangePassword, setForceChangePassword] = useState(0);

    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [CfPassword, setCfPassword] = useState("");
    const [Membership, setMembership] = useState("4");
    const [Type, setType] = useState("individual");
    const [TaxExempt, setTaxExempt] = useState(0);

    const dataDeleteLength = 1;

    const getUserDeltailData = async () => {
        //const res = await axios.post
        // const res = await axios.post('https://api.gearfocus.div4.pgtest.co/apiVendor/profile/detail',
        //     `{"id":"${idUser}"}`
        //     ,
        //     {
        //         headers: {
        //             Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
        //         }
        //     }
        // )
        const res = await dispatch(fetchUserDetailData(idUser))
        console.log(res)
        console.log(res.data.data.info)
        const info = res.data.data.info
        setCompanyName(info.companyName)
        setOrderAsBuyer({ ...OrderAsBuyer, quantity: info.order_as_buyer, total: info.order_as_buyer_total })
        setVendorIncome(info.income)
        setVendorExpense(info.expense)
        setEarning(info.earning)
        setProductTotal(info.products_total)
        setJoined(new Date(info.joined * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }))
        setLastLogin(new Date(info.last_login * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }))
        setLanguage(info.language)
        setReferer(info.referer)

        setFirstName(info.firstName)
        setLastName(info.lastName)
        setEmail(info.email)
        setPaymentType(info.paymentRailsType)
        setPaymentId(info.paymentRailsId)

        setAccessLevel(info.access_level)
        setStatus(info.status)
        setMembership(info.membership_id ? info.membership_id : '')
        setPending(info.pending_membership_id)
        setForceChangePassword(+info.forceChangePassword)
        setTaxExempt(+info.taxExempt)

    }

    useEffect(() => {
        getUserDeltailData();
    }, [])

    const take_decimal_number = (num: number, n: number) => {
        const index = String(num).indexOf('.', 0);
        const result = String(num).slice(0, index + n + 1);
        return result;
    }

    return (
        <div className="padding-left-293">
            <Link to="/user/manage-user">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>{Email} ({CompanyName})</h2>
                {/* Orders placed as a buyer */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Orders placed as a buyer</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span style={{ color: '#007bff' }}>{OrderAsBuyer.quantity}</span><span> (${take_decimal_number(+OrderAsBuyer.total, 2)})</span>
                        </div>
                    </div>
                </div>
                {/* Vendor Income */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Vendor Income</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${VendorIncome}</span>
                        </div>
                    </div>
                </div>
                {/* Vendor Expense */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Vendor Expense</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${VendorExpense}</span>

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
                {/* Earning balance */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Earning balance</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>${Earning}</span>
                        </div>
                    </div>
                </div>
                {/* Products listed as vendor */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Products listed as vendor</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <a href='#'>{ProductTotal}</a>
                        </div>
                    </div>
                </div>
                {/* Joined */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Joined</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{Joined}</span>
                        </div>
                    </div>
                </div>
                {/* Last login */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Last login</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{LastLogin}</span>
                        </div>
                    </div>
                </div>
                {/* Language */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Language</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{Language}</span>
                        </div>
                    </div>
                </div>
                {/* Referer */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Referer</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{Referer}</span>
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
                            <input type="text" defaultValue={FirstName} onChange={e => setFirstName(e.target.value)} autoComplete='off' maxLength={255}></input>
                            {FirstName === '' ?
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
                            <input type="text" defaultValue={LastName} onChange={e => setLastName(e.target.value)} autoComplete='off' maxLength={255}></input>
                            {LastName === '' ?
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
                            <input type="text" defaultValue={Email} onChange={e => setEmail(e.target.value)} autoComplete='off' maxLength={255}></input>
                            {Email === '' ?
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
                            <input type="password" onChange={e => setPassword(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* Confirm password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Confirm password</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="password" onChange={e => setCfPassword(e.target.value)} autoComplete='off' maxLength={255}></input>
                            {CfPassword !== Password ?
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
                            <span>{PaymentType}</span>
                        </div>
                    </div>
                </div>
                {/* PaymentRails ID */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>PaymentRails ID</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{PaymentId}</span>
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
                            <span>{AccessLevel === "100" ? "Administrator" : "Vendor"}</span>
                        </div>
                    </div>
                </div>
                {/* Account status */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Account status<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Membership" id="Membership" onChange={e => setMembership(e.target.value)} value={Status}>
                                <option value="E">Enable</option>
                                <option value="D">Disable</option>
                                <option value="U">Unapproved Vendor</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Status comment (reason) */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Status comment (reason)</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <textarea style={{ width: '100%', minHeight: '64px', color: 'black', fontSize: '14px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* Membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Membership</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Membership" id="Membership" onChange={e => setMembership(e.target.value)} value={Membership}>
                                <option value=''>Ignore Membership</option>
                                <option value="4">General</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Pending membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Pending membership</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <span>{Pending === null ? "None" : Pending}</span>
                        </div>
                    </div>
                </div>
                {/* Require to change password on next log in */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_3}`}>Require to change password on next log in</label>
                    <label className={` ${styles.col_md_3}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" checked={Boolean(ForceChangePassword)} onChange={e => setForceChangePassword(Number(e.target.checked))}></input>
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
                            <input type="checkbox" checked={Boolean(TaxExempt)} onChange={e => setTaxExempt(Number(e.target.checked))}></input>
                        </div>
                    </label>
                </div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning"
                        disabled={false}>Update</button></li>
                </div>
            </div>
        </div >
    );
}

export default DetailUser