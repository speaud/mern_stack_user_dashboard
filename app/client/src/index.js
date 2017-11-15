import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import storeConfig from './store/store.config.js';
//import scss from './styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const store = storeConfig()

// Define the render method in a function expression so it can be used by Webpack HMR
const renderApp = Component => {
  render(
    <AppContainer>
    	<Provider store={store}>
			<MuiThemeProvider>
      			<Component />
  			</MuiThemeProvider>
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