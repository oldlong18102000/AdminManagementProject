import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './modules/common/components/DashBoard/dashboard';
import Preferences from './modules/common/components/Preferences/preferences';
import SignUp from './modules/auth/signup/signup';
import Login from './modules/auth/login/login';
import useToken from './ultis/useToken';


function App() {
  const { token, setToken } = useToken();
  const clearToken = () => {
    setToken(0);
    localStorage.clear();
  }

  if (!token) {
    return (

      <Routes>
        <Route path="/sign-up" element={<SignUp setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Login setToken={setToken} />} />
      </Routes>

    )
    //<Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <button onClick={clearToken}>Exit</button>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/" element={<Preferences />} />
      </Routes>

    </div>
  );
}

export default App;
