import { memo } from 'react'
import { Props } from '../model/UserTableModel'
import { Link } from 'react-router-dom';


function Table(props: Props) {
    const { handleSort, UserList, handleSetDeleteList } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th><input type="checkbox"></input></th>
                    <th className='pointer' onClick={() => handleSort('vendor')}>Login/Email</th>
                    <th className='pointer' onClick={() => handleSort('fistName')}>Name</th>
                    <th className='pointer' onClick={() => handleSort('access_level')}>Access level</th>
                    <th>Products</th>
                    <th>Orders</th>
                    <th>Wishlist</th>
                    <th className='pointer' onClick={() => handleSort('created')}>Created</th>
                    <th className='pointer' onClick={() => handleSort('last_login')}>Last Login</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {UserList && UserList.length > 0 && UserList.map((item, index) => {
                    return (
                        <tr key={`users-${index}`} id={`users-${item.profile_id}`}>
                            <th><input type="checkbox" name='name[]' id='check_all'></input></th>
                            <td><Link to={`user-detail/${item.profile_id}`}>{item.vendor}</Link><div>{item.storeName}</div></td>
                            <td><a className='link'>{(item.fistName ? item.fistName : "") + " " + (item.lastName ? item.lastName : "")}

                            </a></td>
                            <td>{item.access_level}</td>
                            <td><a className='link'>{item.product}</a></td>
                            <td>
                                {item.order.order_as_buyer === 0
                                    ? <div>{item.order.order_as_buyer}</div>
                                    : <a className='link'>{item.order.order_as_buyer}</a>
                                }
                            </td>
                            <td><a className='link'>{item.wishlist}</a></td>
                            <td>{+item.created !== 0 ? new Date(+item.created * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                            <td>{+item.created !== 0 ? new Date(+item.last_login * 1000).toLocaleString("en-VN", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }) : 'Never'}</td>
                            <td>
                                <button className='btn-default' onClick={() => handleSetDeleteList(item.profile_id)}>
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