import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
//import AsyncValidationForm from '../components/AsyncValidationForm'
// import { api } from '../../api/'
//import SyncValidationForm from '../components/SyncValidationForm'

import { testApi, userSignUp, userLogIn } from '../actions/'

class QueryForm extends Component {
  constructor(props){
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
   this.props.testApi()
  }

  signup(values){
    this.props.userSignUp(values)
  }

  login(values) {
    //console.log("login")
    //console.dir(values)
    this.props.userLogIn(values)
  }



  render(){
    return (
      <div className="container">
        <div className="row">sss
          <SignUpForm onSubmit={this.signup} />
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
    userSignUp,
    userLogIn
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryForm);