import React from 'react';
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

import * as actions from '../../../store/Actions/index';

const navigationItems = (props) => {

    const openAuthtentication = () => {
        if (props.closeSideDrawer) props.closeSideDrawer();
        props.onAuthenticationHandler();
    }

    const onLogoutHandler = () => {
        if (props.closeSideDrawer) props.closeSideDrawer();
        props.onLogout();
    }

    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {props.isAuth ?
                <li className={styles.ConnectButton} >
                    <Button
                        clicked={onLogoutHandler}
                        type="Danger" >
                        Logout
                    </Button>
                </li>
                :
                <li className={styles.ConnectButton} >
                    <Button
                        clicked={openAuthtentication}
                        type="Login" >
                        Connect
                        </Button>
                </li>
            }
        </ul>
    );

};


const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticationHandler: () => dispatch(actions.onAuthenticationHandler()),
        onLogout: () => dispatch(actions.logout())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navigationItems));