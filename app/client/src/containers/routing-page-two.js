import React, { Component } from 'react'
import { connect } from 'react-redux'

class RoutingPageTwo extends Component {

  render(){
    return (
      <div className="container">
        <div className="row">
          RoutingPageTwo
        </div>
      </div>
    )
  }
}

export default connect()(RoutingPageTwo);