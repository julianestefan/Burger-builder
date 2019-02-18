import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as Actions from '../../store/Actions/index';
import axios from '../../shared/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch( Actions.fetchOrders(token, userId ) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(Orders, axios));