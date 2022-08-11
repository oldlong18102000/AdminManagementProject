import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../scss/login.css';
import { push, replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { useNavigate } from 'react-router-dom';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../ultis/httpResponseCode';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import axios from 'axios';

interface LoginProps {
  setToken: Function;
}

function loginUser2(credentials: object) {
  return fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function SignUp({ setToken }: LoginProps) {
  const navigate = useNavigate()
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [locations, setLocations] = useState('');
  const [state, setState] = useState('');


  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser2({
      email,
      password
    });
    console.log(token.data.token)
    setToken({ "token": `${token?.data.token}` });
  }

  const getLocation = React.useCallback(async () => {

    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(json.data);
      return;
    }
  }, []);

  const getLocation2 = React.useCallback(async () => {

    axios.get(API_PATHS.getLocation)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => { getLocation() }, [getLocation]);

  return (
    <div className="login-wrapper">
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Địa chỉ Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Mật khẩu</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Xác nhận lại mật khẩu</p>
          <input type="password" onChange={e => setCfPassword(e.target.value)} />
        </label>
        <label>
          <p>Họ và tên</p>
          <input type="text" onChange={e => setName(e.target.value)} />
        </label>
        <label>
          <p>Giới tính</p>
          <select onChange={e => { setName(e.target.value); console.log(locations) }}>
            <option value="">-- select an option --</option>
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </label>
        <label>
        </label>
        <p>Quốc gia</p>
        <input type="text" onChange={e => setName(e.target.value)} />
        <label>
          <p>Thành phố</p>
          <input type="text" onChange={e => setName(e.target.value)} />
        </label>
        <div>
          <button type="submit">Đăng ký ngay</button>
        </div>
      </form>
      <div>Bạn chưa có tài khoản ?</div>
      <a style={{ 'cursor': 'pointer' }} onClick={() => {
        console.log(123)
        // dispatch(push(ROUTES.login))
        navigate(ROUTES.login)
      }}>Đăng nhập ngay</a>
    </div>
  )
}

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired
}