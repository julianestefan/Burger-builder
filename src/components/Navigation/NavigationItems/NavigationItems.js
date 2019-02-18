import React from 'react';
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
        props.onLogout();
        if (props.closeSideDrawer)  props.closeSideDrawer();
    }

    return (
        <ul className={styles.NavigationItems}>
            <li onClick = {props.closeSideDrawer} >
            <NavigationItem  link="/" exact >Burger Builder</NavigationItem>
            </li> 
            {props.isAuth ? <li onClick = {props.closeSideDrawer}> <NavigationItem link="/orders" onClick= {props.closeSideDrawer} >Orders</NavigationItem> </li> : null} 
            {props.isAuth ? (
                <li className={styles.ConnectButton} >
                    <Button
                        clicked={onLogoutHandler}
                        type="Danger" >
                        Logout
                    </Button>
                </li>
            ) : (
                    <li className={styles.ConnectButton} >
                        <Button
                            clicked={openAuthtentication}
                            type="Login" >
                            Connect
                    </Button>
                    </li>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);