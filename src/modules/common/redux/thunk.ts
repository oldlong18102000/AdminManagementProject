import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../ultis/httpResponseCode';
import Cookies from 'js-cookie';
import axios from 'axios';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const res = await fetch(url, {
      credentials: 'include',
      method,
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      headers:
        contentType !== 'multipart/form-data'
          ? {
            'Content-Type': contentType || 'application/json',
            Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
          }
          : {},
      cache: 'no-store',
    });

    const json = await res.json();

    if (json?.success === RESPONSE_STATUS_UNAUTHORIZED) {
      // dispatch logout, remove access token here.
    }

    return json;
    // throw new Error('Error');
  };
}

export function axiosThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const config = {
      // contentType: "application/json",
      headers: {
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      }
    }
    const res = await axios[method](url, body, config);
    const json = await res.data;

    if (json?.success === RESPONSE_STATUS_UNAUTHORIZED) {
      // dispatch logout, remove access token here.
    }

    return json;
    // throw new Error('Error');
  };
}