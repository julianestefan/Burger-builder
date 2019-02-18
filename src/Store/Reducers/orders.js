import * as ActionTypes from '../Actions/ActionTypes';
import { updateObject } from '../../shared/HelperFunctions';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case ActionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart( state, action );
        case ActionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action )
        case ActionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
        case ActionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case ActionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        default: return state;
    }
};

export default reducer;