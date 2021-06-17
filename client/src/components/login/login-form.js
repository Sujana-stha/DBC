import React from 'react';
import {Field, reduxForm} from 'redux-form';

const renderInputField=({input, id, placeholder, type, iconName, meta: {touched, error}})=> {
    return(
        <div className="wrap-input100 validate-input">
				<input id={id} className="input100" type={type} placeholder={placeholder} {...input}  />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className={iconName} aria-hidden="true"></i>
						</span>
                <div className="error">
                    {touched ? error: ''}
                </div>
        </div>
    )
}

const LoginForm = props =>{
	const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit}>
            <Field
                name="email"
                type="text"
                iconName="fas fa-envelope"
                placeholder="Email"
                id="email"
                label="Email"
                component={renderInputField}
            />
            <Field
                name="password"
                type="password"
                iconName="fas fa-lock"
                placeholder="Password"
                id="password"
                label="Password"
                component={renderInputField}
            />
            
            <div className="row">
                <div className="col-8">
                    <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                </div>
                {/* <!-- /.col --> */}
                <div className="container-login100-form-btn">
					<button type="submit" className="login100-form-btn">
					Login
				</button>
 					</div>

 					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<a className="txt2" href="#">
							Username / Password?
						</a>
                {/* <!-- /.col --> */}
            </div>
        </div>
		</form>
    );
};

function validate(values) {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }
    if(!values.password) {
        errors.password = 'You must enter password'
    } else if(values.password.length > 191) {
        errors.password = "Must be 191 character or less!"
    }

}
export default reduxForm({
    validate,
    form: "LoginForm"
})(LoginForm);
// class Login extends Component {
// 	constructor(props)  {
// 		super(props);
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleFormSubmit = this.handleFormSubmit.bind(this);
// 		this.state = {
// 			email: "",
// 			password: ''
// 		}
// 	}
// 	handleChange= (e)=> {
// 		this.setState({[e.target.name]:e.target.value});
// 	}
// 	// on form submit...
// 	handleFormSubmit(e) {
// 		e.preventDefault()
// 	   localStorage.setItem('authData',JSON.stringify(this.state));
// 	}
	 
//     render () {
//         return (
//             <div className="limiter">
//                 <div className="container-login100">
			
//                 <div className="wrap-login100">
//                 {/* <div className="login-logo">
//                     <a href=""><b>Admin</b>LTE</a>
//                 </div> */}
//                 <form className="login100-form validate-form" onSubmit={this.handleFormSubmit}>
// 					<span className="login100-form-title">
// 						Admin Login
// 					</span>

// 					<div className="wrap-input100 validate-input">
// 						<input className="input100" value={this.state.email} type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
// 						<span className="focus-input100"></span>
// 						<span className="symbol-input100">
// 							<i className="fa fa-envelope" aria-hidden="true"></i>
// 						</span>
// 					</div>

// 					<div className="wrap-input100 validate-input" data-validate = "Password is required">
// 						<input className="input100" value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
// 						<span className="focus-input100"></span>
// 						<span className="symbol-input100">
// 							<i className="fa fa-lock" aria-hidden="true"></i>
// 						</span>
// 					</div>

// 					<div className="container-login100-form-btn">
// 						<button type="submit" className="login100-form-btn">
// 							Login
// 						</button>
// 					</div>

// 					<div className="text-center p-t-12">
// 						<span className="txt1">
// 							Forgot
// 						</span>
// 						<a className="txt2" href="#">
// 							Username / Password?
// 						</a>
// 					</div>

					
// 				</form>
//             </div>
//             </div>
//             </div>
//         )
//     }
// }

// export default Login;