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


const AddInterest = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Interest</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter Title"
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter Title"
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
    if (!values.title) {
        errors.title = "This field is empty."
    } else if (values.title.length > 20) {
        errors.title = "Must be 20 character or less!"
    }
    
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddInterest'
})(AddInterest);