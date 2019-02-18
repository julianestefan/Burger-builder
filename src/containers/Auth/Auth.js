import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';

import { updateObject } from '../../shared/HelperFunctions';
import * as actions from '../../store/Actions/index';

class Auth extends Component {

    state = {
        login: true,
        data: {
            email: '',
            password: ''
        },
    }

    registerChangeHandler = () => {
        this.setState(prevState => {
            return { login: !prevState.login };
        });
    }

    inputsUpdateHandler = (event) => {
        let data = null;
        if (event.target.name === 'email') {
            data = {
                data: {
                    email: event.target.value,
                    password: this.state.data.password
                }
            };
        } else {
            data = {
                data: {
                    email: this.state.data.email,
                    password: event.target.value
                }
            };
        }
        this.setState(updateObject(this.state, data));
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.data.email, this.state.data.password, this.state.login)
    }

    render() {

        let cancelButtonFunction = this.props.onAuthenticating;
        if (!this.state.login) cancelButtonFunction = this.registerChangeHandler;

        let errorMessage = null;
        if (this.props.error) errorMessage = <p>{this.props.error.message}</p>

        let form = <>
            {this.state.login ? <p>Login to taste a delicious burger</p> : <p>Create your account to order a burger</p>}
            < form onSubmit={this.submitHandler} >
                <input
                    type='text'
                    placeholder="Your email"
                    name="email"
                    onChange={this.inputsUpdateHandler}
                    value={this.state.data.email} />
                <input
                    type="password"
                    placeholder="Your pasword"
                    name="password"
                    minLength="6"
                    onChange={this.inputsUpdateHandler}
                    value={this.state.data.password} />
                {errorMessage}
                <div className={styles.ButtonContainer} >
                    <Button type="Danger" clicked={cancelButtonFunction} > Cancel </Button>
                    <Button type="submit" > Confirm</Button>
                </div>
            </form >
            {this.state.login ? <p className={styles.Switch} onClick={this.registerChangeHandler}> or create an account</p> : null}
        </>;

        if (this.props.loading) form = <Spinner />;
        
        

        return (
            <Modal show={this.props.authenticating} closing={this.props.onAuthenticating} >
                <div className={styles.AuthModal}>
                    <div className={styles.Logo}>
                        <Logo />
                    </div>
                    {form}
                </div>

            </Modal>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        authenticating: state.auth.authenticating,
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticating: () => dispatch(actions.onAuthenticationHandler()),
        onAuth: (email, password, login) => dispatch(actions.auth(email, password, login))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);