import React, { Component, Suspense } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

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

    const routes = [
      <Route path='/' exact component={BurgerBuilder} />
    ];

    const authRoutes = [
      <Route path='/checkout' component={React.lazy(() => import('./containers/Checkout/Checkout'))} />,
      <Route path='/orders' component={React.lazy(() => import('./containers/Orders/Orders'))} />
    ]

    if (this.props.isAuth) routes.push(authRoutes);

    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              {routes}
              <Redirect to="/" />
            </Switch>
          </Suspense>
          <Auth />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
