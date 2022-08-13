import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './redux/reducer';
import { Action } from 'typesafe-actions';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './ultis/constants';
import { API_PATHS } from './configs/api';
import { fetchThunk } from './modules/common/redux/thunk';
import { RESPONSE_STATUS_SUCCESS } from './ultis/httpResponseCode';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { Routes } from './Routes';


function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo({ ...json.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
