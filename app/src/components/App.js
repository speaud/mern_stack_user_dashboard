import React from 'react'
import QueryForm from '../containers/QueryForm.js'
import QueryResults from '../containers/QueryResults.js'
import { IS_PRODUCTION } from '../constants/'
import DevTools from '../containers/DevTools'

const App = () => (
    <div>
		<QueryForm></QueryForm>
		<QueryResults></QueryResults>
		{!IS_PRODUCTION && 
			<DevTools />
		}
    </div>
);

export default App;