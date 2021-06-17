import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as objectiveApi from '../../api/objectives-api';

class EditObjective extends Component {
    componentDidMount() {

        const id = this.props.editId;
        objectiveApi.getSingleObjective(id).then((response) => {
            const data = response.data;
            this.props.initialize(data);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input value={value} id={id} type={type} className={touched && error ? "form-control is-invalid" : "form-control"} placeholder={placeholder} {...input} />
                <div className="error text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 col-xs-12 col-lg-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Edit Objective Details</h3>
                        </div>

                        <form className="col s12" onSubmit={handleSubmit} >
                            <div className="card-body">
                                <Field
                                    label="Enter Title"
                                    id="title"
                                    name="title"
                                    type="text"
                                    value="title"
                                    placeholder="Enter Title"
                                    component={this.renderInputField}
                                />

                            </div>                            
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
function validate(values) {
    const errors = {}
    if (!values.title) {
        errors.title = "This field is empty."
    } else if (values.title.length > 200) {
        errors.title = "Must be 200 character or less!"
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'EditObjective'
})(EditObjective);