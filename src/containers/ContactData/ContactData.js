import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Styles from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Julian Estefan',
                address: {
                    street: 'Cadaques 1123',
                    zipCode: '7609',
                    city: 'Santa Clara del Mar'
                },
                email: 'julian@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', data)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {

        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="posta" placeholder="Postal code" />
                <Button type="Success" clicked={this.orderHandler} > ORDER</Button>
            </form>
        );

        if (this.state.loading) form = <Spinner />;

        return (
            <div className={Styles.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>);
    }
}

export default withRouter(ContactData);