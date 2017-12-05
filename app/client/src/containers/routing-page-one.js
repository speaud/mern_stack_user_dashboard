import React, { Component } from 'react'
import { Link } from 'react-router'

export default class RoutingPageOne extends Component {

  render(){
    return (
      <div className="container">
        <div className="row">
          RoutingPageOne
          <Link to="two">two</Link>
          <Link to="404">three</Link>
        </div>
      </div>
    )
  }
}
