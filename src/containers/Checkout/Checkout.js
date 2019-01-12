import React, { Component } from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import {Route} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            if (param[0] !== 'price') {
                ingredients[param[0]] = +param[1];
            }else {
                price = param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });
    }

    render() {
        return (
            <div>
                <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    onCheckoutCanceled = {this.checkoutCanceledHandler}
                    onCheckoutContinued = {this.checkoutContinuedHandler} />

                <Route path = {this.props.match.path + '/contact-data'} render = {() => <ContactData price = {this.state.price} ingredients = {this.state.ingredients} /> } />
            </div>
        );
    }
}

export default Checkout;