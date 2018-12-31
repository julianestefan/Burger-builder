import React, { Component } from 'react';
import styles from './Modal.module.css'
import Button from '../Button/Button'
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show ;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.closing} />
                <div
                    className={styles.Modal}
                    style={{
                        opacity: this.props.show ? '1' : '0',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-450vh)'
                    }}>
                    {this.props.children}
                    <Button
                        clicked={this.props.closing}
                        type="Danger">
                        Cancel
                    </Button>
                    <Button
                        clicked={this.props.continuing}
                        type="Success">
                        Continue
                    </Button>
                </div>
            </>
        );
    }
}




export default Modal;