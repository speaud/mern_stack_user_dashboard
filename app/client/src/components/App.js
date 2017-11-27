import React from 'react'
import Login from '../containers/Login'
//import RoutingPageOne from '../containers/routing-page-one'
//import RoutingPageTwo from '../containers/routing-page-two'
//import RoutingPageThree from '../containers/routing-page-three'
import { IS_PRODUCTION } from '../constants/'
import DevTools from '../containers/DevTools'

const App = () => (
    <div>
		{/*
		*/}
		<Login />
		{!IS_PRODUCTION && 
			<DevTools />
		}
    </div>
);

export default App;