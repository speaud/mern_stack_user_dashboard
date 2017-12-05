import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import storeConfig from './store/store.config.js';
//import scss from './styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { IS_PRODUCTION } from './constants/'

import DevTools from './containers/DevTools'

//console.log("IS_PRODUCTION = " + IS_PRODUCTION)

import Root from './root'
const store = storeConfig()

const history = syncHistoryWithStore(browserHistory, store);



import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Redbox from 'redbox-react';



// Get the DOM Element that will host our React application
const rootEl = document.getElementById('app');

// Render the React application to the DOM
render(
  <AppContainer errorReporter={Redbox}>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
   const orgError = console.error; // eslint-disable-line no-console
   console.error = (message) => { // eslint-disable-line no-console
     if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
       // Log the error as normally
       orgError.apply(console, [message]);
     }
   };

  module.hot.accept('./root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./root').default;

    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  });
}




/*
// Define the render method in a function expression so it can be used by Webpack HMR
const renderApp = Component => {
  render(
    <AppContainer>
    	<Provider store={store}>
        <div>
          <MuiThemeProvider>
            <Component />
          </MuiThemeProvider>
          {!IS_PRODUCTION && 
            <DevTools />
          }        
        </div>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(App)

// Enable Webpack HMR, for development only
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => { renderApp(App) })
}*/



