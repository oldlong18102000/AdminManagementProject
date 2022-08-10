import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        if (localStorage.getItem('token')) {
            const tokenString = localStorage.getItem('token') || '';
            const userToken = JSON.parse(tokenString);
            return userToken?.token
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: any) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}