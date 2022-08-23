import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import '../../../scss/login.css';
import { ROUTES } from '../../../configs/routes';
import { push, replace } from 'connected-react-router';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { getErrorMessageResponse } from '../../../ultis';
import { fetchAPIgetLocation, fetchAPIgetState, fetchAPIsignUp } from '../redux/Action';
import { ISignUpParams } from '../model/SignUpModel';

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [location, setLocations] = useState([]);
    const [id, setId] = useState('');
    const [states, setState] = useState([]);

    const getLocation = React.useCallback(async () => {
        const json = await dispatch(fetchAPIgetLocation(setLocations));
    }, []);

    useEffect(() => { getLocation() }, [getLocation]);

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            const json = dispatch(fetchAPIsignUp(values, setLoading))
            setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch]);

    const handleState = (e: any) => {
        setId(e.target.value);
    }

    const getState = React.useCallback(async () => {
        //setLoading(true);
        if (id) {
            const json = await dispatch(fetchAPIgetState(id, setState));
            //console.log(`${API_PATHS.getStateByLocation}${id}`);
            //setLoading(false);
        }
    }, [id]);

    useEffect(() => { getState(); }, [id]);

    const NavigateLogin = () => {
        dispatch(replace(ROUTES.login));
    }
    return (
        <div className="container display-container">
            <SignUpForm
                onStates={handleState}
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={location}
                states={states}
            />
            Bạn đã có tài khoản?
            <a className="NavigateAuth" onClick={NavigateLogin}>
                <FormattedMessage id="loginnow" />
            </a>
        </div>
    );
};

export default SignUpPage;
