import { useState } from 'react'
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';


const Header = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { userName } = useSelector((state: AppState) => ({
        userName: state.profile.user?.login,
    }));
    const [hideProfile, setHideProfile] = useState({ display: 'none' });
    const [hideSideBar, setHideSideBar] = useState(true);

    const onLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        dispatch(replace(ROUTES.login))

    }

    return (
        <>
            <header className="main-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} >
                    <i className="fa-solid fa-bars" onClick={() => setHideSideBar(!hideSideBar)}></i>
                    <div className="brand-logo">
                        <div className="brand-logo-name">
                            Gear Focus Admin
                        </div>
                    </div>
                </div>
                <nav className="main-nav">
                    <div className='profile'>
                        <i className="fa-regular fa-user"></i>
                        <div className="profile-logout">
                            <ul style={{ "display": "block" }}>
                                <li>My profile</li>
                                <li>{userName}</li>
                                <li style={{ 'cursor': 'pointer' }} onClick={onLogout}>Log out</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="sidebar" style={{ ...hideSideBar ? { display: 'inline-block' } : { display: 'none' } }}>
                <ul style={{ listStyle: "inline-block" }}>
                    <li><Link to="/products/manage-product"><i className="fa-solid fa-tag"></i>Catalog</Link></li>
                    <li><Link to="/products/manage-product">Products</Link></li>
                    <li><Link to="/user/manage-user"><i className="fa-solid fa-user-group"></i>User</Link></li>
                    <li><Link to="/user/manage-user">User list</Link></li>
                </ul>
            </div>
        </>
    )
}
export default Header;