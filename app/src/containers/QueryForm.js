import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryAction, limitQuery, searchQuery, resetQuery, runQuery } from '../actions/';

class QueryForm extends Component {
  constructor(props){
    super(props);

    const {dispatch} = props;
    
    this.onQueryAction = this.onQueryAction.bind(this);
    this.onResetQuery = this.onResetQuery.bind(this);
    this.onLimitQuery = this.onLimitQuery.bind(this);
    this.onSearchQuery = this.onSearchQuery.bind(this);
  }

  componentWillMount() {
    console.log("componentWillMount")

    console.log(this.state)
  }

  onQueryAction(e) {
    this.props.queryAction(e.target.value)
  }

  onResetQuery(e){
    e.preventDefault();

    this.props.resetQuery()
  }

  onLimitQuery(e){
   this.props.limitQuery(e.target.value) 
  }

  onSearchQuery(e){
    this.props.searchQuery(e.target.value)
  }

  render(){
    const { query } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <p>Step 1: Select Source</p>
            <select value={query.source} onChange={this.onQueryAction}>
              <option value=""></option>
              <option value="reddit">Reddit</option>
            </select>
          </div>
          {query.source.length > 0 &&
            <div className="col-6">
              <input type="button" name="resetQuery" value="Reset Query" onClick={this.onResetQuery} />
            </div>
          }
        </div>

        {query.source.length > 0 &&
          <div className="row">
            <div className="col-6">
              <p>Step 2: Select Limit</p>
              <input type="number" name="limit" step="1" min="1" max="25" onChange={this.onLimitQuery} value={query.limit} />
            </div>
          </div>
        }

        {query.limit.length > 0 &&
          <div className="row">
            <div className="col-6">
              <p>Step 3: Select Search Term</p>
              <select value={query.search} onChange={this.onSearchQuery}>
                <option value=""></option>
                <option value="reactjs">react js</option>
                <option value="angular">angular</option>
                <option value="threejs">three js</option>
                <option value="philly">philly</option>
              </select>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.Query
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    queryAction: queryAction,
    limitQuery: limitQuery,
    searchQuery: searchQuery,
    resetQuery: resetQuery,
    runQuery: runQuery
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryForm);