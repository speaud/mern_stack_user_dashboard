import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'password'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  
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

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
    <p>login form</p>
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
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Login
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate
})(LoginForm)