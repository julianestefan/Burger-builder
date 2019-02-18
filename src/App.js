import React, { Component, Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layput/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
import Auth from './containers/Auth/Auth';

import * as actions from './store/Actions/index';

class App extends Component {
  componentWillMount() {
    this.props.onCheckAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Suspense fallback={<Spinner />}>
            <Route path='/checkout' component={React.lazy(() => import('./containers/Checkout/Checkout'))} />
            <Route path='/orders' component={React.lazy(() => import('./containers/Orders/Orders'))} />
          </Suspense>
          <Auth />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState())
  };
}; 

export default withRouter(connect(null, mapDispatchToProps)(App)) ;
