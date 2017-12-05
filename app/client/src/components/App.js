/*import React from 'react'
import Login from '../containers/Login'
//import RoutingPageOne from '../containers/routing-page-one'
//import RoutingPageTwo from '../containers/routing-page-two'
//import RoutingPageThree from '../containers/routing-page-three'
import { IS_PRODUCTION } from '../constants/'
import DevTools from '../containers/DevTools'

const App = () => (
    <div>
		<Login />
    </div>
);

export default App;
*/

import React, { PropTypes } from 'react';

const App = (props) => (
  <div className="page-container">
    {React.cloneElement({...props}.children, {...props})}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
