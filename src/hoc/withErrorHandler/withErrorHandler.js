import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component{
        
        state = {
            error: null
        }
    
        componentWillMount() {
           this.requestInterceptor =  axios.interceptors.request.use(request => {
                this.setState( { error: null } ); 
                return request;
            }); 
            this.responseInterceptor = axios.interceptors.response.use( response => response,  error => {
                this.setState( { error: error } ); 
            });
        }

        errorConfirmHandler = () =>{
            this.setState({error: null});
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        
        render () {
            return (
                <>
                    <Modal 
                    show = {this.state.error} 
                    closing = {this.errorConfirmHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </>
            );
        }
    };
}

export default withErrorHandler;