import React, { Component } from 'react'
import { Link } from 'react-router'
import Login from '../containers/Login'

export default class RoutingPageOne extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <Login />
          RoutingPageOneA<br />
          RoutingPageOneA<br />
          RoutingPageOneA<br />
          RoutingPageOneA<br />
          <Link to="two">two</Link>
          <Link to="404">three</Link>
        </div>
      </div>
    )
  }
}
