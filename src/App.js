import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layput/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
import Auth from './containers/Auth/Auth';

class App extends Component {
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

export default App;
