import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import '../ProductTable/scss/TableProduct.css'
import './scss/TableUser.css'
import ReactPaginate from 'react-paginate';
import ModalConfirm from './components/ModalConfirm';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { AppState } from '../../../../redux/reducer';
import { fetchAPIgetBrands, fetchAPIgetCategory, fetchAPIgetCountry, fetchAPIgetVendor } from '../../../../services/Action';
import { IUserTableParams } from './model/UserTableModel';
import { fetchUserData } from './redux/Action';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Table from './components/Table';

const initData = {
    page: 1,
    count: 25,
    search: "",
    memberships: [],
    types: [],
    status: [] as String[],
    country: "",
    state: "",
    address: "",
    phone: "",
    date_type: "R",
    date_range: [],
    sort: "last_login",
    order_by: "DESC",
}

const UserList = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const listCountries = useSelector((state: AppState) => (state.services.countrylist));
    const [Search, setSearch] = useState("");
    const [StateCity, setStateCity] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");

    const [Inventory, setInventory] = useState<Array<String>>([]);
    const [Country, setCountry] = useState("");
    const [byVendor, setByVendor] = useState({ name: "", id: "", hide: true });
    const [membershipinfo, setMembershipInfo] = useState([]);
    const [usertypeinfo, setUserTypeInfo] = useState([]);
    const [DateRange, setDateRange] = useState([]);
    const [state, setState] = useState(initData);

    const [CheckedAll, setCheckedAll] = useState(true);
    const [UserList, setUserList] = useState<Array<IUserTableParams>>([]);
    const [Page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(+0);
    const [totalItem, setTotalItem] = useState(0);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState(Array<String>);
    const [dataDeleteLength, setDataDeleteLength] = useState(0);
    const [HideMember, SetHideMenber] = useState(false);
    const [HideUserType, SetHideUserType] = useState(false);
    const [hideSearchBox, setHideSearchBox] = useState(true);
    const [OnOff, SetOnOff] = useState(true);
    const [DateType, SetDateType] = useState("R");
    const { RangePicker } = DatePicker;


    useEffect(() => {
        dispatch(fetchAPIgetCountry());
    }, [])

    const handleSetUserList = (data: any) => {
        setUserList(data)
    }
    const handleSetTotalItem = (data: any) => {
        setTotalItem(data)
    }
    const handleSetPageCount = (data: any) => {
        setPageCount(data)
    }

    const fetch = async () => {
        const json = await dispatch(fetchUserData(state))
        handleSetUserList(json?.data)
        handleSetTotalItem(+json.recordsFiltered)
        const pc = +json.recordsFiltered / state.count
        handleSetPageCount(Math.round(pc))
    };

    // const fetchUserData = async () => {
    //     const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list",
    //         `{
    //         "page":${state.page},
    //         "count":${state.count},
    //         "search":"${state.search}",
    //         "memberships":[${state.memberships}],
    //         "types":[${state.types}],
    //         "status":[${state.inventory}],
    //         "country":"${state.country}",
    //         "state":"${state.state}",
    //         "address":"${state.address}",
    //         "phone":"${state.phone}",
    //         "date_type":"${state.date_type}",
    //         "date_range":[${state.date_range}],
    //         "sort":"${state.sort}",
    //         "order_by":"${state.order_by}",
    //         "tz":7 }`,
    //         {
    //             headers: {
    //                 Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
    //             }
    //         })
    //     setUserList(res.data.data)
    //     setTotalItem(+res.data.recordsFiltered)
    //     const pc = +res.data.recordsFiltered / state.count
    //     setPageCount(Math.round(pc))
    // }

    //Call API
    useEffect(() => {
        fetch();
    }, [state])

    const handlePageClick = (event: any) => {
        setState({ ...state, page: event.selected + 1 });
        console.log(event.selected);
    };

    const handleSort = useCallback((sortName: string) => {
        state.order_by === 'ASC'
            ? setState({ ...state, sort: sortName, order_by: 'DESC' })
            : setState({ ...state, sort: sortName, order_by: 'ASC' });
        return;
    }, [state])

    //Check all - Check none
    // const handleCheckAll = () => {
    //     // Lấy danh sách checkbox
    //     var checkboxes = document.getElementsByName('name[]');

    //     // Lặp và thiết lập checked
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         checkboxes[i].checked = true;
    //     }
    //     setCheckedAll(false);
    // }

    // const handleCheckNone = () => {
    //     // Lấy danh sách checkbox
    //     var checkboxes = document.getElementsByName('name[]');

    //     // Lặp và thiết lập Uncheck
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         checkboxes[i].checked = false;
    //     }
    //     setCheckedAll(true);
    // }

    // const handle = (CheckedAll: boolean) => {
    //     if (CheckedAll === true)
    //         handleCheckAll()
    //     else
    //         handleCheckNone()
    // }

    // const onChange = (dates: date, dateStrings) => {
    //     console.log('ơ thê lại vào đây à ?', dateStrings)
    //     if (dates) {
    //         setDateRange(dateStrings.map(i => '"' + i + '"'))
    //         console.log(dateStrings)
    //         console.log('From: ', dates[0], ', to: ', dates[1]);
    //         console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    //     } else {
    //         console.log('Clear');
    //         console.log(dateStrings)
    //         setDateRange([]);
    //     }
    // };

    const handleOpacity = (OpacityList: Array<String>) => {
        for (const id of OpacityList) {
            let element = document.getElementById(`users-${id}`);
            element!.className = '';
        }
    }

    const handleSearch = () => {
        setState(state => ({
            ...state,
            'search': Search,
            'status': Inventory,
            'country': Country,
            'memberships': membershipinfo,
            'types': usertypeinfo,
            'state': StateCity,
            'address': Address,
            'phone': Phone,
            'date_type': DateType,
            'date_range': DateRange,
        }));
    }

    const handleSetDeleteList = useCallback((id: string) => {
        const element = document.getElementById(`users-${id}`);
        if (element?.className === "") {
            element.className = "opacity05";
            dataUserDelete.push(`${id}`);
            //setDataProductDelete([...dataProductDelete, id]);
            setDataDeleteLength(dataUserDelete.length);
            console.log(id);
        }
        else {
            element!.className = "";
            const index = dataUserDelete.indexOf(`${id}`);
            if (index > -1) {
                dataUserDelete.splice(index, 1);
            }
            setDataDeleteLength(dataUserDelete.length);
            console.log(id);
        }
    }, [dataUserDelete])

    const handleChange = (e: any) => {
        // Destructuring
        const { value, checked, name } = e.target;
        console.log(`e is ${name}`);
        console.log(`${value} is ${checked}`);
        if (name === 'membership') {
            // Case 1 : The user checks the box
            if (checked) {
                // setMembershipInfo(
                //     membershipinfo => [...membershipinfo, value],
                // );
                console.log('membershipinfo-add', membershipinfo)
            }

            // Case 2  : The user unchecks the box
            else {
                setMembershipInfo(
                    membershipinfo => membershipinfo.filter(e => e !== value),
                );
                console.log('membershipinfo-delete', membershipinfo)

            }
        } else {
            if (checked) {
                // setUserTypeInfo(
                //     // usertypeinfo => [...usertypeinfo, value],
                // );
                console.log('usertypeinfo-add', usertypeinfo)
            }

            else {
                setUserTypeInfo(
                    usertypeinfo => usertypeinfo.filter(e => e !== value),
                );
                console.log('usertypeinfo-delete', usertypeinfo)

            }
        }

    };

    return (<>
        <div className="padding-left-293">
            <div className="title">Search for users</div>
            <div className="search-conditions-box">
                <ul className="search-conditions">
                    <li className="substring-condition-user">
                        <div className="table-value">
                            <input type="text" placeholder='Search keywords' name="search" onChange={e => setSearch(e.target.value)} id="search-keywords" autoComplete='off' maxLength={255}></input>
                        </div>
                    </li>
                    <li className="memberships-codition">
                        <select name="memberships" id="memberships" defaultValue={'All memberships'} onClick={() => SetHideMenber(!HideMember)}>
                            <option value="0" style={{ display: 'none' }}>All memberships</option>
                        </select>
                        <div className="search-membership-value" style={{ ...HideMember ? { display: '' } : { display: 'none' } }}>
                            <label>Memberships</label><br />
                            <input type='checkbox' name='membership' value='"M_4"' onChange={handleChange} />
                            <label htmlFor='gen1'>General</label><br />
                            <label>Pending Memberships</label><br />
                            <input type='checkbox' name='membership' value='"P_4"' onChange={handleChange} />
                            <label htmlFor='gen2'>General</label>
                        </div>
                    </li>
                    <li className="memberships-codition">
                        <select name="memberships" id="memberships" defaultValue={'All memberships'} onClick={() => SetHideUserType(!HideUserType)}>
                            <option value="0" style={{ display: 'none' }}>All user types</option>
                        </select>
                        <div className="search-user-types-value" style={{ ...HideUserType ? { display: '' } : { display: 'none' } }}>
                            <label>Memberships</label><br />
                            <input type='checkbox' name='usertype' value='"1"' onChange={handleChange} />
                            <label htmlFor='gen1'>Administrator</label><br />
                            <input type='checkbox' name='usertype' value='"3"' onChange={handleChange} />
                            <label htmlFor='gen2'>Content management</label><br />
                            <input type='checkbox' name='usertype' value='"2"' onChange={handleChange} />
                            <label htmlFor='gen3'>Coupons management</label><br />
                            <input type='checkbox' name='usertype' value='"5"' onChange={handleChange} />
                            <label htmlFor='gen4'>Vendor</label><br />
                            <input type='checkbox' name='usertype' value='"6"' onChange={handleChange} />
                            <label htmlFor='gen5'>View order reports</label><br />
                            <input type='checkbox' name='usertype' value='"4"' onChange={handleChange} />
                            <label htmlFor='gen6' style={{ width: '80%' }}>Volume discount management</label><br />
                            <label>Pending Memberships</label><br />
                            <input type='checkbox' name='usertype' value='"C"' onChange={handleChange} />
                            <label htmlFor='gen7'>Regisered Customers</label><br />
                            <input type='checkbox' name='usertype' value='"N"' onChange={handleChange} />
                            <label htmlFor='gen8'>Anonymous Customers</label>
                        </div>
                    </li>
                    <li className="inventory-codition">
                        <select name="inventory" id="inventory" defaultValue={'Any status'} onChange={e => setInventory([e.target.value])}>
                            <option value="">Any status</option>
                            <option value='E'>Enable</option>
                            <option value='D'>Disable</option>
                            <option value='U'>Unapproved vendor</option>
                        </select>
                    </li>
                    <li className="actions">
                        <button type='submit' className='btn-default' onClick={() => handleSearch()}>Search</button>
                    </li>
                </ul>
                {hideSearchBox ?
                    <div className="btn-appear-search">
                        <button onClick={() => setHideSearchBox(false)}>DOWN</button>
                    </div>
                    : null}

                {!hideSearchBox ?
                    <>
                        <div className="search-conditions-hidden">
                            <ul className="by_conditions-condition-user">
                                <div className="by_conditions-location">
                                    <label>Country</label>
                                    <select name="country" id="country" value={Country} onChange={e => setCountry(e.target.value)}>
                                        <option value="">Select country</option>
                                        {listCountries && listCountries.length > 0 && listCountries.map((item, index) => {
                                            return (<option key={`country-${index}`} value={item.code}>{item.country}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="by_conditions-location">
                                    <label>State</label>
                                    <div className="substring-condition-user">
                                        <input type="text" name="search" id="search-keywords" onChange={e => setStateCity(e.target.value)} maxLength={255}></input>
                                    </div>
                                </div>
                                <div className="by_conditions-location">
                                    <label>Address</label>
                                    <div className="substring-condition-user">
                                        <input type="text" name="search" id="search-keywords" onChange={e => setAddress(e.target.value)} maxLength={255}></input>
                                    </div>
                                </div>
                                <div className="by_conditions-location">
                                    <label>Phone</label>
                                    <div className="substring-condition-user">
                                        <input type="text" name="search" id="search-keywords" onChange={e => setPhone(e.target.value)} maxLength={255}></input>
                                    </div>
                                </div>
                            </ul>
                            <ul className="user-activity-condition d-flex">
                                <label style={{ marginRight: '20px' }}>User activity</label>
                                <div style={{ display: 'block' }}>

                                    <div style={{ marginBottom: '10px' }}>
                                        <input type="radio" style={{ marginRight: '5px' }} checked={OnOff} onChange={() => { SetOnOff(!OnOff); SetDateType("R") }} />Register
                                        <input type="radio" style={{ margin: '0px 5px' }} checked={!OnOff} onChange={() => { SetOnOff(!OnOff); SetDateType("L") }} />Last logged in
                                    </div>
                                    {console.log('lan1', DateRange)}
                                    <RangePicker
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        showTime
                                        format='YYYY-MM-DD'
                                    // onChange={onChange}
                                    />
                                </div>
                            </ul>
                        </div>
                        <div className="btn-appear-search" >
                            <button onClick={() => setHideSearchBox(true)}>UP</button>
                        </div>
                    </>
                    : null}
            </div>
            <div className="actions">
                <Link to="/user/new-user"><button type='submit' className='btn-default'>Add User</button></Link>
            </div>
            <Table handleSort={handleSort} UserList={UserList} handleSetDeleteList={handleSetDeleteList} />

            <div className="pagination-bar">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<<"
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName='active'
                />
                <div>{totalItem} items</div>
                <select className="pagiSelect" onChange={e => setState({ ...state, count: +e.target.value })} defaultValue={25}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>

            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    {/* <li><button type="button" className="btn btn-warning" onClick={() => console.log(dataUserDelete)}>Save changes</button></li> */}
                    <li><button type="button" className="btn btn-warning" onClick={() => setIsShowModalConfirm(true)}
                        disabled={dataDeleteLength === 0 ? true : false}>Remove selected</button></li>
                    <li><button type="button" className="btn btn-warning">Export all: CSV</button></li>
                </div>
            </div>
        </div>
        <ModalConfirm show={isShowModalConfirm}
            handleClose={() => setIsShowModalConfirm(false)}
            dataUserDelete={dataUserDelete}
            setDataUserDelete={setDataUserDelete}
            setDataDeleteLength={setDataDeleteLength}
            handleOpacity={() => handleOpacity(dataUserDelete)}
            handleFetchData={fetch}
            dispatch={dispatch}
        />
    </>)
}

export default UserList