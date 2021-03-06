import * as ActionTypes from './ActionTypes';
import axios from '../../shared/axios-orders'

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: ActionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: ActionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = ( orderData, token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post( '/orders.json?auth=' + token , orderData )
            .then( response => {
                dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
            } )
            .catch( () => {
                dispatch( purchaseBurgerFail( ) );
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: ActionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: ActionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: ActionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId ) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams )
            .then( response => {
                const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( errror => {
                dispatch(fetchOrdersFail(errror));
            } );
    };
};