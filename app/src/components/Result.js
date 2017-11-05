import React from 'react'
import PropTypes from 'prop-types'

const Results = ({results}) => (
  <ul>
    {results.map((result, i) =>
  		<li key={i}>
  			<p><small>Result {i}</small></p>
   			<p>Author - {result.author}</p>
			<p>Title - <a href={result.url} target="_blank">{result.title}</a></p>
	  	</li>
    )}
  </ul>
)

Results.propTypes = {
  results: PropTypes.array.isRequired
}

export default Results