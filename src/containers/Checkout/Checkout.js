import React, { Component } from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            chesse: 1,
            bacon: 1
        }
    }

    render() {
        return (
            <div>
                <OrderSummary ingredients = {this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;