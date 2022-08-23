import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './scss/TableProduct.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactPaginate from 'react-paginate';
import ModalConfirm from './components/ModalConfirm';
import { Link } from 'react-router-dom';
import { IListCategories, IProductTableParams } from './model/ProductTableModel';
import { fetchProductData } from './redux/Action';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { fetchAPIgetBrands, fetchAPIgetCategory, fetchAPIgetCountry, fetchAPIgetVendor } from '../../../../services/Action';
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
  const [Search, setSearch] = useState("");
  const [Category, SetCategory] = useState("0");
  const [StockStatus, setStockStatus] = useState("all");
  const [byConditions, setByConditions] = useState(['']);
  const [Availability, setAvailability] = useState("all");
  const [byVendor, setByVendor] = useState({ name: "", id: "", hide: true });
  const [state, setState] = useState(initData);

  const [CheckedAll, setCheckedAll] = useState(true);
  const [ProductList, setProductList] = useState([]);
  const [pageCount, setPageCount] = useState(+0);
  const [totalItem, setTotalItem] = useState(0);
  const [hideSearchBox, setHideSearchBox] = useState(true);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [dataProductDelete, setDataProductDelete] = useState(Array<String>);
  const [dataDeleteLength, setDataDeleteLength] = useState(0);

  const listCategories = useSelector((state: AppState) => (state.services.categorylist));
  const listVendors = useSelector((state: AppState) => (state.services.vendorlist));

  useEffect(() => {
    dispatch(fetchAPIgetVendor());
    dispatch(fetchAPIgetCategory());
    dispatch(fetchAPIgetBrands());
    dispatch(fetchAPIgetCountry());
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
    console.log('sortName', sortName);
    state.order_by === 'ASC'
      ? setState({ ...state, sort: sortName, order_by: 'DESC' })
      : setState({ ...state, sort: sortName, order_by: 'ASC' });
    return;
  }, [])

  const handlebyconditions = (e: any) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      setByConditions([...byConditions, e.target.value])
    }
    else {
      setByConditions(byConditions.filter(val => val !== e.target.value))
    }
  }

  const handleSetDeleteList = useCallback((e: any) => {
    const element = document.getElementById(`products-${e.id}`);
    if (element?.className === "") {
      element.className = "opacity05";
      dataProductDelete.push(`${e.id}`);
      setDataDeleteLength(dataProductDelete.length);
      console.log(e.id);
    }
    else {
      const index = dataProductDelete.indexOf(`${e.id}`);
      if (index > -1) {
        dataProductDelete.splice(index, 1);
      }
      setDataDeleteLength(dataProductDelete.length);
      console.log(e.id);
    }
  }, [])


  const handleSearch = () => {
    setState(state => ({
      ...state,
      'search': Search,
      'category': Category,
      'availability': Availability,
      'stock_status': StockStatus,
      'search_type': byConditions.toString().slice(1),
    }));
  }

  return (
    <>
      <div className="padding-left-293">
        <div className="title">Products</div>
        <div className="search-conditions-box">
          <ul className="search-conditions">
            <li className="substring-condition">
              <div className="table-value">
                <input type="text" placeholder='Search keywords' name="search" onChange={e => setSearch(e.target.value)} id="search-keywords" autoComplete='off' maxLength={255}></input>
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
          {hideSearchBox ?
            <div className="btn-appear-search">
              <button onClick={() => setHideSearchBox(false)}>DOWN</button>
            </div>
            : null}
          {!hideSearchBox ?
            <>
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
                <li className="vendor-condition d-flex">
                  <label style={{ marginRight: '10px' }}>Vendor</label>
                  <div>
                    <input type="text" id="search-vendor" autoComplete='off'
                      value={byVendor.name}
                      onChange={e => { setByVendor({ ...byVendor, 'name': e.target.value, hide: false }) }}
                      onBlur={e => { setByVendor({ ...byVendor, hide: true }) }}>
                    </input>
                    <ul className="search-vendor-value" style={{ ...byVendor.hide ? { display: 'none' } : { display: '' } }} >
                      {listVendors && listVendors.length > 0 && listVendors.map((item, index) => {
                        return (<li key={`vendor-${index}`} value={item.id}><a>{item.name}</a></li>)
                      })}
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="btn-appear-search" >
                <button onClick={() => setHideSearchBox(true)}>UP</button>
              </div>
            </>
            : null}
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
            <li><button type="button" className="btn btn-warning" onClick={() => console.log(dataProductDelete)}>Save changes</button></li>
            <li><button type="button" className="btn btn-warning" onClick={() => setIsShowModalConfirm(true)}
              disabled={dataDeleteLength === 0 ? true : false}>Remove selected</button></li>
            <li><button type="button" className="btn btn-warning">Export all: CSV</button></li>
          </div>
        </div>
      </div>
      <ModalConfirm show={isShowModalConfirm}
        handleClose={() => setIsShowModalConfirm(false)}
        dataProductDelete={dataProductDelete}
      // setDataProductDelete={() => setDataProductDelete()}
      // setDataDeleteLength={() => setDataDeleteLength()}
      // handleOpacity={() => handleOpacity(dataProductDelete)}
      // handleFetchData={() => fetchProductData()} 
      />
    </>
  )
}

export default ProductTable