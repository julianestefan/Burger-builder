import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';

import * as actions from '../../store/Actions/index';

class Auth extends Component {

    state = {
        login: true
    }

    registerChangeHandler = () => {
        this.setState({ login: !this.state.login })
    }

    render() {

        let modalContent = (
            <div className={styles.AuthModal} >
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <p>Login to taste a delicious burger</p>
                <form>
                    <input type='text' placeholder="Your username" />
                    <input type="password" placeholder="Your pasword" />
                    <div className={styles.ButtonContainer} >
                        <Button type="Danger" clicked={this.props.onAuthenticating} > Cancel </Button>
                        <Button type="submit" > Confirm</Button>
                    </div>
                </form>
                <hr></hr>
                <p className={styles.Switch} onClick={this.registerChangeHandler}> or create an account</p>
            </div>
        );

        if (!this.state.login) {
            modalContent = (
                <div className={styles.AuthModal} >
                    <div className={styles.Logo}>
                        <Logo />
                    </div>
                    <p>Create your account to order a burger</p>
                    <form>
                        <input type='text' placeholder="Your username" />
                        <input type="password" placeholder="Your pasword" />
                        <div className={styles.ButtonContainer} >
                            <Button type="Danger" clicked={this.registerChangeHandler} > Cancel </Button>
                            <Button type="submit" > Confirm</Button>
                        </div>
                    </form>
                </div>
            )
        }

        return (
            <Modal show={this.props.authenticating} closing={this.props.onAuthenticating} >
                {modalContent}
            </Modal>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        authenticating: state.auth.authenticating
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticating: () => dispatch(actions.onAuthenticationHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);