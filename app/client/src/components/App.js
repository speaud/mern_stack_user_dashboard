import React from 'react'
import Login from '../containers/Login'
import { IS_PRODUCTION } from '../constants/'
import DevTools from '../containers/DevTools'


const App = () => (
    <div>
		<Login />
		{!IS_PRODUCTION && 
			<DevTools />
		}
		
    </div>
);

export default App;