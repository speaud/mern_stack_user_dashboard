import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from './app';

import RoutingPageOne from '../containers/routing-page-one'
import RoutingPageTwo from '../containers/routing-page-two'
import RoutingPageThree from '../containers/routing-page-three'
import DevTools from '../containers/DevTools'

const ProviderComponent = ({ store, history }) => {
  // https://github.com/ReactTraining/react-router/tree/v2.8.1/docs
  const routes = {
    path: '/',
    component: App,
    indexRoute: { component: RoutingPageOne },
    childRoutes: [
      { path: 'two', component: RoutingPageTwo },
      { path: '404', component: RoutingPageThree },
      {
        path: '*',
        onEnter: ({ params }, replace) => replace('404')
      }
      // TODO: 404 handling for nested path (e.g., asdasd/adasd/adasd/...)
    ]
  }

  let providerComponent = (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        <DevTools />
      </div>
    </Provider>
  );

  return providerComponent;
};

ProviderComponent.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default ProviderComponent;