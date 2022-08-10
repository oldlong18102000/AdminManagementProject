import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../scss/login.css';
import { push, replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setToken: Function;
}

function loginUser(credentials: object) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function loginUser2(credentials: object) {
  return fetch('http://api.training.div3.pgtest.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }: LoginProps) {
  const navigate = useNavigate()

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>Bạn chưa có tài khoản ?</div>
      <a style={{ 'cursor': 'pointer' }} onClick={() => {
        // navigate(ROUTES.signUp)
        dispatch(replace(ROUTES.signUp))
      }}>Đăng ký ngay</a>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}