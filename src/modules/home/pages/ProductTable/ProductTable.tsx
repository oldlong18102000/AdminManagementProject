import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './scss/TableProduct.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactPaginate from 'react-paginate';
import ModalConfirm from './components/ModalConfirm';
import { Link } from 'react-router-dom';
import { IListCategories, IListVendors } from './model/ProductTableModel';
import { fetchProductData } from './redux/Action';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { fetchAPIgetCategory, fetchAPIgetVendor, setVendor } from '../../../../services/Action';
import Autocomplete from '@mui/material/Autocomplete';

import Table from './components/Table';

const initData = {
  page: 1,
  count: 25,
  search: "",
  category: "0",
  stock_status: "all",
  availability: "all",
  vendor: "",
  sort: "name",
  order_by: "ASC",
  search_type: ""
}
const ProductTable = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listCategories = useSelector((state: AppState) => (state.services.categorylist));
  const listVendors = useSelector((state: AppState) => (state.services.vendorlist));
  const [Search, setSearch] = useState("");
  const [Category, SetCategory] = useState("0");
  const [StockStatus, setStockStatus] = useState("all");
  const [byConditions, setByConditions] = useState(['']);
  const [Availability, setAvailability] = useState("all");
  const [byVendor, setByVendor] = useState("");
  const [inputValue, setInputValue] = useState<IListVendors | null>({ name: '', id: '', });

  const [state, setState] = useState(initData);
  const [CheckedAll, setCheckedAll] = useState(true);
  const [ProductList, setProductList] = useState([]);
  const [pageCount, setPageCount] = useState(+0);
  const [totalItem, setTotalItem] = useState(0);
  const [hideSearchBox, setHideSearchBox] = useState(true);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [dataProductDelete, setDataProductDelete] = useState(Array<String>);
  const [dataDeleteLength, setDataDeleteLength] = useState(0);

  useEffect(() => {
    dispatch(fetchAPIgetVendor());
    dispatch(fetchAPIgetCategory());
  }, [])

  const handleSetProductList = (data: any) => {
    setProductList(data)
  }
  const handleSetTotalItem = (data: any) => {
    setTotalItem(data)
  }
  const handleSetPageCount = (data: any) => {
    setPageCount(data)
  }
  const fetch = async () => {
    const json = await dispatch(fetchProductData(state))
    handleSetProductList(json?.data)
    handleSetTotalItem(+json.recordsFiltered)
    const pc = +json.recordsFiltered / state.count
    handleSetPageCount(Math.round(pc))
  };
  //Call API
  useEffect(() => {
    fetch();
  }, [state])//phải truyền vào id của vendor

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

  const handlebyconditions = (e: any) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      setByConditions([...byConditions, e.target.value])
    }
    else {
      setByConditions(byConditions.filter(val => val !== e.target.value))
    }
  }

  const handleSetDeleteList = useCallback((id: string) => {
    const element = document.getElementById(`products-${id}`);
    if (element?.className === "") {
      element.className = "opacity05";
      dataProductDelete.push(`${id}`);
      //setDataProductDelete([...dataProductDelete, id]);
      setDataDeleteLength(dataProductDelete.length);
      console.log(id);
    }
    else {
      element!.className = '';
      const index = dataProductDelete.indexOf(`${id}`);
      if (index > -1) {
        dataProductDelete.splice(index, 1);
      }
      setDataDeleteLength(dataProductDelete.length);
      console.log(id);
    }
  }, [dataProductDelete])

  const handleOpacity = (OpacityList: Array<String>) => {
    for (const id of OpacityList) {
      let element = document.getElementById(`products-${id}`);
      element!.className = '';
    }
  }

  const handleSearch = () => {
    setState(state => ({
      ...state,
      'search': Search,
      'category': Category,
      'availability': Availability,
      'stock_status': StockStatus,
      'search_type': byConditions.toString().slice(1),
      'vendor': byVendor
    }));
  }

  const handleOnChangeAutocomplete = (newValue: IListVendors) => {
    setInputValue(newValue);
    setByVendor(newValue?.id ? newValue.id : "");
  }
  return (
    <>
      <div className="padding-left-293">
        <div className="title">Products</div>
        <div className="search-conditions-box">
          <ul className="search-conditions">
            <li className="substring-condition">
              <div className="table-value">
                <input type="text" placeholder='Search keywords' name="search" onChange={e => setSearch(e.target.value)} id="search-keywords"></input>
              </div>
            </li>
            <li className="categoryId-codition">
              <select name="category" id="category" defaultValue={'Any category'} onChange={e => SetCategory(e.target.value)}>
                <option value="0">Any category</option>
                {listCategories && listCategories.length > 0 && listCategories.map((item: IListCategories, index) => {
                  return (<option key={`category-${index}`} value={item.id}>{item.name}</option>)
                })}
              </select>
            </li>
            <li className="inventory-codition">
              <select name="inventory" id="inventory" defaultValue={'Any inventory'} onChange={e => setStockStatus(e.target.value)}>
                <option value="all">Any inventory</option>
                <option value="in">In stock</option>
                <option value="low">Low stock</option>
                <option value="out">SOLD</option>
              </select>
            </li>
            <li className="actions">
              <button type='submit' className='btn-default' onClick={() => handleSearch()}>Search</button>
            </li>
          </ul>
          <div className="btn-appear-search" hidden={!hideSearchBox}>
            <button onClick={() => setHideSearchBox(false)}>DOWN</button>
          </div>
          <div hidden={hideSearchBox}>
            <ul className="search-conditions-hidden">
              <li className="by_conditions-condition">
                <label>Search in:</label>
                <ul className='by-conditions'>
                  <li>
                    <input type="checkbox" name="name" value="name" checked={byConditions.includes('name')} onChange={handlebyconditions} />
                    <label htmlFor="by-title">Name</label>
                  </li>
                  <li>
                    <input type="checkbox" name="sku" value="sku" checked={byConditions.includes('sku')} onChange={handlebyconditions} />
                    <label htmlFor="by-sku">SKU</label>
                  </li>
                  <li>
                    <input type="checkbox" name="description" value="description" checked={byConditions.includes('description')} onChange={handlebyconditions} />
                    <label htmlFor="by-descr">Full Description</label>
                  </li>
                </ul>
              </li>
              <li className="availability-condition d-flex">
                <label style={{ marginRight: '10px' }}>Availability</label>
                <select name="availability" id="availability" value={Availability}
                  onChange={e => setAvailability(e.target.value)}>
                  <option value="all">Any availability status</option>
                  <option value="1">Only enabled</option>
                  <option value="0">Only disabled</option>
                </select>
              </li>
              <li className="vendor-condition d-flex" >
                <label style={{ marginRight: '10px' }}>Vendor</label>
                <Autocomplete
                  disablePortal
                  options={listVendors}
                  value={inputValue}
                  onChange={(event, newValue) => handleOnChangeAutocomplete(newValue!)}
                  sx={{
                    display: 'inline-block',
                    '& input': {
                      width: 300,
                      bgcolor: 'background.paper',
                      color: (theme) =>
                        theme.palette.getContrastText(theme.palette.background.paper),
                    },
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input type="text" {...params.inputProps} />
                    </div>
                  )}
                />
              </li>
            </ul>
            <div className="btn-appear-search" >
              <button onClick={() => setHideSearchBox(true)}>UP</button>
            </div>
          </div>
        </div>
        <div className="actions">
          <Link to="/products/new-product"><button type='submit' className='btn-default'>Add Product</button></Link>
        </div>
        <Table handleSort={handleSort} ProductList={ProductList} handleSetDeleteList={handleSetDeleteList} />
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
            {/* <li><button type="button" className="btn btn-warning" onClick={() => console.log(dataProductDelete)}>Save changes</button></li> */}
            <li><button type="button" className="btn btn-warning" onClick={() => setIsShowModalConfirm(true)}
              disabled={dataDeleteLength === 0 ? true : false}>Remove selected</button></li>
            <li><button type="button" className="btn btn-warning">Export all: CSV</button></li>
          </div>
        </div>
      </div>
      <ModalConfirm show={isShowModalConfirm}
        handleClose={() => setIsShowModalConfirm(false)}
        dataProductDelete={dataProductDelete}
        setDataProductDelete={setDataProductDelete}
        setDataDeleteLength={setDataDeleteLength}
        handleOpacity={() => handleOpacity(dataProductDelete)}
        handleFetchData={fetch}
        dispatch={dispatch}
      />
    </>
  )
}

export default ProductTable