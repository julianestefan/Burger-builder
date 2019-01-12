import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Styles from './ContactData.module.css' ;
import axios from 'axios';

class ContactData extends Component{
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
             ingredients: this.state.ingredients,
             price: this.state.totalPrice,
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
                 console.log(response);
                 this.setState({ loading: false });
                 this.modalClosingHandler();
             })
             .catch(error => {
                 this.setState({ loading: false });
             });
    }

    render () {
        return (
            <div className = {Styles.ContactData}>
                <h4> Enter your contact data</h4>
                <form>
                    <input type="text" name = "name" placeholder = "Your name" />
                    <input type="email" name = "email" placeholder = "Your email" />
                    <input type="text" name = "street" placeholder = "Street" />
                    <input type="text" name = "posta" placeholder = "Postal code" />
                    <Button type = "Success"> ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;