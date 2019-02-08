import * as ActionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../shared/HelperFunctions';


const initialState = {
    authenticating: false
}

const onAuthenticationHandler = (state) => {
    return updateObject( state, {authenticating: !state.authenticating} );
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.ON_AUTHENTICATION_HANDLER: return onAuthenticationHandler(state) ;
        default: return state;
    }
}

export default reducer;