import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContactForm from '../components/Form'

class QueryForm extends Component {
  constructor(props){
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values){
    // print the form values to the console
    console.log("submit - values")
    console.log(values)
  }  

  render(){
    return (
      <div className="container">
        <div className="row">
          <ContactForm onSubmit={this.submit} />
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

//export default connect(mapStateToProps, mapDispatchToProps)(QueryForm);
export default connect(mapStateToProps)(QueryForm);