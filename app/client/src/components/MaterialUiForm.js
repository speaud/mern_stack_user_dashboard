import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import asyncValidate from './asyncValidate'

import validator from '../modules/validator'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'fullName',
    'email',
    'username',
    'password'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }

    // values[field] && !validator.values[field](values[field])
    // return validator.values[field].message 
  })
  
  if ( values.email && !validator.email(values.email) ) {
    errors.email = 'Invalid email address'
  }

  if ( values.fullName && !validator.fullName(values.fullName) ) {    
    errors.fullName = 'Invalid full name'
  }

  if ( values.username && !validator.username(values.username) ) {    
    errors.username = 'Your username must be unique, eight characters long or more, and contain only letters and numbers'
  }  

  if ( values.password && !validator.password(values.password) ) {    
    errors.password = 'Password must eight characters long containing one upper case, one lower case, one number, and one special character'
  } 

  return errors
}

const renderTextField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error },
  ...custom
}) => (
  <div className={asyncValidating ? 'async-validating' : ''}>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      type={type}
      {...input}
      {...custom}
    />  
  </div>
)

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="fullName"
          component={renderTextField}
          label="Full Name (First Last)"
        />
      </div>
      <div>
        <Field
          name="email"
          component={renderTextField}
          label="Email"
        />
      </div>
      <div>
        <Field
          name="username"
          component={renderTextField}
          label="Username"
        />
      </div>
      <div>
        <Field
          name="password"
          type="password"
          component={renderTextField}
          label="Password"
        />      
      </div>
{/*



      <div>
        <Field name="employed" component={renderCheckbox} label="Employed" />
      </div>
*/}

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'email']  
})(MaterialUiForm)