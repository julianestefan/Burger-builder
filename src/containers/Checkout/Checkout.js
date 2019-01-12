import React, { Component } from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import {Route} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            chesse: 1,
            bacon: 1
        }
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    render() {
        return (
            <div>
                <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    onCheckoutCanceled = {this.checkoutCanceledHandler}
                    onCheckoutContinued = {this.checkoutContinuedHandler} />

                <Route path = {this.props.match.path + '/contact-data'} render = {() => <ContactData ingredients = {this.state.ingredients} /> } />
            </div>
        );
    }
}

export default Checkout;