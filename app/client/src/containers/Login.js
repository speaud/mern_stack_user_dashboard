import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
//import AsyncValidationForm from '../components/AsyncValidationForm'
import { api } from '../../api/'
//import SyncValidationForm from '../components/SyncValidationForm'

import { testApi, testUserPost, userSignUp, checkUsername } from '../actions/'

class QueryForm extends Component {
  constructor(props){
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
   console.log(api.val)
   this.props.testApi()
  }

  signup(values){
    // print the form values to the console
    //console.log("---")
    //console.log("submit - values")
    //console.log(values)
    //this.props.checkUsername(values)
    this.props.userSignUp(values)
    //this.props.testUserPost(values)
  }

  login(values) {
    console.log("login")
  }



  render(){
    return (
      <div className="container">
        <div className="row">
          <p>sign up form</p>
          <SignUpForm onSubmit={this.signup} />
          <p>login in form</p>
          <LoginForm onSubmit={this.login} />
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