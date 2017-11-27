import React, { Component } from 'react'
import { connect } from 'react-redux'

class RoutingPageOne extends Component {

  render(){
    return (
      <div className="container">
        <div className="row">
          RoutingPageOne
        </div>
      </div>
    )
  }
}

export default connect()(RoutingPageOne);