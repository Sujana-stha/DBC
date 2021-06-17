import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}


const AddUser = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Users</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter First Name"
                                id="firstName"
                                name="first_name"
                                type="text"
                                placeholder="Enter First Name"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Last Name"
                                id="lastName"
                                name="last_name"
                                type="text"
                                placeholder="Enter Last Name"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter username"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Email"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Password"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                component={renderInputField}
                            />
                            
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

}

const validate = (values) => {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = "This field is empty."
    } else if (values.first_name.length > 20) {
        errors.first_name = "Must be 20 character or less!"
    }
    if (!values.last_name) {
        errors.last_name = "This field is empty."
    } else if (values.last_name.length > 20) {
        errors.last_name = "Must be 20 character or less!"
    }
    if (!values.username) {
        errors.username = "This field is empty."
    } else if (values.username.length > 20) {
        errors.username = "Must be 20 character or less!"
    }
    if (!values.email) {
        errors.email = 'Email is Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }

    if(!values.password) {
        errors.password = 'You must have Password'
    } else if(values.password.length < 8) {
        errors.password = "Password must be a minimum of 8 characters."
    }
    
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddUser'
})(AddUser);