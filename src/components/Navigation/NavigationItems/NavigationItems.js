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

    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <li className = {styles.ConnectButton} > <Button clicked = { openAuthtentication  } type="Login" > Connect </Button></li> 
        </ul>
    );
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticationHandler: () => dispatch(actions.onAuthenticationHandler())
    };
}

export default connect(null, mapDispatchToProps)(navigationItems);