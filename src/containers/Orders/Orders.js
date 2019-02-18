import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Order from '../../components/Order/order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as Actions from '../../store/Actions/index';
import axios from '../../shared/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
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

        if (!this.props.token) orders = <Redirect to='/' />

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
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch( Actions.fetchOrders(token) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(Orders, axios));