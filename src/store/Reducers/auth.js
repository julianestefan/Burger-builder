import * as ActionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../shared/HelperFunctions';


const initialState = {
    authenticating: false,
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: null
}

const onAuthenticationHandler = (state) => {
    return updateObject( state, {authenticating: !state.authenticating} );
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.ON_AUTHENTICATION_HANDLER: return onAuthenticationHandler(state);
        case ActionTypes.AUTH_START: return authStart(state, action);
        case ActionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case ActionTypes.AUTH_FAILED: return authFail(state, action);
        case ActionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case ActionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state;
    }
}

export default reducer;