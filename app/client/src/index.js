import React from 'react'
import Redbox from 'redbox-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { createStore } from 'redux'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { IS_PRODUCTION } from './constants'

//import scss from './styles/index.scss';

import DevTools from './containers/DevTools'
import ProviderComponent from './components/provider'
import storeConfig from './store/store.config.js'

console.log("IS_PRODUCTION = " + IS_PRODUCTION, "module.hot = " + JSON.stringify(module.hot))

const
  store = storeConfig(),
  history = syncHistoryWithStore(browserHistory, store),
  rootDomElement = document.getElementById('app');

// Render the React application to the DOM
render(
  <AppContainer errorReporter={Redbox}>
  <MuiThemeProvider>
    <ProviderComponent store={store} history={history} />
    </MuiThemeProvider>
  </AppContainer>,
  rootDomElement
);

if (module.hot) {
   /*
     Warning from React Router, caused by react-hot-loader.
     The warning can be safely ignored, so filter it from the console.
     Otherwise you'll see it every time something changes.
     See https://github.com/gaearon/react-hot-loader/issues/298
   */
   const orgError = console.error; // eslint-disable-line no-console
   console.error = (message) => { // eslint-disable-line no-console
     if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
       // Log the error as normally
       orgError.apply(console, [message]);
     }
   };

  module.hot.accept('./components/provider', () => {
    render(
      <AppContainer errorReporter={Redbox}>
      <MuiThemeProvider>
        <ProviderComponent store={store} history={history} />
        </MuiThemeProvider>
      </AppContainer>,
      rootDomElement
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
}
*/