import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../shared/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/Actions/index'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onIngredientsInit();
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    modalClosingHandler = () => {
        this.setState({ purchasing: false });
    }

    modalContinuinghandler = () => {
        this.props.history.push('/checkout');
    }

    disabledBuildControls() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;
        return disabledInfo;
    }

    render() {

        let orderSummary = null;
        let burger = this.props.error ? <p> Ingredients can´t be loaded </p> : <Spinner />;

        if (this.props.ingredients) {
            burger = <>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={this.disabledBuildControls()}
                    price={this.props.totalPrice}
                    purchasable={this.props.totalPrice > 0}
                    ordered={this.purchasingHandler}
                />
            </>;
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                continuing={this.modalContinuinghandler}
                closing={this.modalClosingHandler} />;
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    closing={this.modalClosingHandler}
                    continuing={this.modalContinuinghandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onIngredientsInit: () => dispatch(actions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));