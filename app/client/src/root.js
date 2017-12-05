import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';

import RoutingPageOne from './containers/routing-page-one'
import RoutingPageTwo from './containers/routing-page-two'
import RoutingPageThree from './containers/routing-page-three'
import DevTools from './containers/DevTools'


const Root = ({ store, history }) => {
  const routes = {
    path: '/',
    component: App,
    indexRoute: { component: RoutingPageOne },
    childRoutes: [
      { path: 'two', component: RoutingPageTwo },
      { path: '404', component: RoutingPageThree },
    ]
  }

/*const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    {
      path: 'inbox',
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id',
        onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
      }]
    },
    {
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id', component: Message
      }]
    }
  ]
}*/

  let ComponentEl = (
    <Provider store={store}>
      <div>
        {/*<Router history={history} routes={routes} />*/}
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={RoutingPageOne} />
            <Route path="two" component={RoutingPageTwo} />
            <Route path="404" component={RoutingPageThree} />
            <Redirect from="*" to="404" />
          </Route>
        </Router>
        <DevTools />
      </div>
    </Provider>
  );

  return ComponentEl;
};

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
