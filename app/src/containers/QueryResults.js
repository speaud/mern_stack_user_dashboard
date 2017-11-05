import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Result from '../components/Result';

class QueryForm extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { query } = this.props;

    return (
      <div>
        {query.search .length > 0 && query.meta.fetching &&
          <div className="container">
            <p>loading...</p>
          </div>
        }
        {query.results.length > 0 &&
          <div className="container">
            <div className="col-12">
              <p>Results for: <i>'{query.search}'</i></p>
              <Result results={query.results.slice(0, query.limit)} />
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state){

  return {
    query: state.Query
  };
}

export default connect(mapStateToProps)(QueryForm);