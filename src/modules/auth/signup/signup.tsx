import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../scss/login.css';
import { push, replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser2({
      email,
      password
    });
    console.log(token.data.token)
    setToken({ "token": `${token?.data.token}` });
  }

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
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Họ và tên</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>Bạn chưa có tài khoản ?</div>
      <a style={{ 'cursor': 'pointer' }} onClick={() => {
        console.log(123)
        dispatch(push(ROUTES.login))
        // navigate(ROUTES.login)
      }}>Đăng nhập ngay</a>
    </div>
  )
}

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired
}