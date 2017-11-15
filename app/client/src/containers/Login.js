import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialUiForm from '../components/MaterialUiForm'
//import AsyncValidationForm from '../components/AsyncValidationForm'
import { api } from '../../api/'
//import SyncValidationForm from '../components/SyncValidationForm'

import { testApi, testUserPost, userSignUp, checkUsername } from '../actions/'

class QueryForm extends Component {
  constructor(props){
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
   console.log(api.val)
   this.props.testApi()
  }

  submit(values){
    // print the form values to the console
    //console.log("---")
    //console.log("submit - values")
    //console.log(values)
    //this.props.checkUsername(values)
    this.props.userSignUp(values)
    //this.props.testUserPost(values)
  }



  render(){
    return (
      <div className="container">
        <div className="row">
          <MaterialUiForm onSubmit={this.submit} />
          {/*

            https://redux-form.com/7.1.2/examples/
            
            <AsyncValidationForm onSubmit={this.submit} />
            <hr />
            <p>SyncValidationForm</p>
            <SyncValidationForm onSubmit={this.submit} />
          */}
        </div>
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
    testApi,
    testUserPost,
    userSignUp,
    checkUsername
  },dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(QueryForm);
//export default connect(mapStateToProps)(QueryForm);