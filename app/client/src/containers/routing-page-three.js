import React, { Component } from 'react'
import { connect } from 'react-redux'

class RoutingPageThree extends Component {

  render(){
    return (
      <div className="container">
        <div className="row">
          RoutingPageThree
        </div>
      </div>
    )
  }
}

export default connect()(RoutingPageThree);