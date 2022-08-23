import { memo } from 'react'
import { Props } from '../model/ProductTableModel'
import { Link } from 'react-router-dom';


function Table(props: Props) {
    const { handleSort, ProductList, handleSetDeleteList } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th><input type="checkbox"></input></th>
                    <th className='pointer' onClick={() => handleSort('sku')}>SKU</th>
                    <th className='pointer' onClick={() => handleSort('name')}>Name</th>
                    <th>Category</th>
                    <th className='pointer' onClick={() => handleSort('price')}>Price</th>
                    <th className='pointer' onClick={() => handleSort('amount')}>In stock</th>
                    <th className='pointer' onClick={() => handleSort('vendor')}>Vendor</th>
                    <th className='pointer' onClick={() => handleSort('arrivalDate')}>Arrival Date</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {ProductList && ProductList.length > 0 && ProductList.map((item, index) => {
                    return (
                        <tr key={`products-${index}`} id={`products-${item.id}`}>
                            <th><input type="checkbox" name='name[]' id='check_all'></input></th>
                            <td>{item.sku}</td>
                            <td><Link to={`product-detail/${item.id}`} title={`${item.name}`}>{item.name}</Link></td>
                            <td>{item.category}</td>
                            <td>${item.price.slice(0, item.price.indexOf('.') + 3)}</td>
                            <td>{item.amount}</td>
                            <td><a className='link' title={`${item.vendor}`} href='#'>{item.vendor}</a></td>
                            <td>{item.arrivalDate !== '0' ? new Date(+item.arrivalDate * 1000).toLocaleString("en-ZA", { month: "short", day: "numeric", year: "numeric" }) : '--'}</td>
                            <td>
                                <button className='btn-default' onClick={handleSetDeleteList}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default memo(Table)