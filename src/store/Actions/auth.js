import * as ActionTypes from './ActionTypes';

import axios from 'axios';

export const onAuthenticationHandler = () =>{
    return {
        type: ActionTypes.ON_AUTHENTICATION_HANDLER
    };
}

export const authStart = () =>{
    return {
        type: ActionTypes.AUTH_START
    };
}

export const authSuccess= (token, userId) =>{
    return {
        type: ActionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
}

export const authFailed = (error) =>{
    return {
        type: ActionTypes.AUTH_FAILED,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: ActionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignin) => {
    return dispatch => {
        dispatch( authStart() );
        const autData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBldFcxaJZsSInOf8sdLueytbltbOrl_4U';
        if (isSignin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBldFcxaJZsSInOf8sdLueytbltbOrl_4U';
        }        
        axios.post(url, autData)
            .then( response =>{
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(onAuthenticationHandler())
            })
            .catch( error => {
                dispatch( authFailed(error.response.data.error) );
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: ActionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};