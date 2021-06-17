import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginRequest} from '../../actions/login-actions';
import loadjs from 'loadjs';

//COMPONENTS
import LoginForm from '../../components/login/login-form';

class LoginFormContainer extends Component {
    componentDidMount() {
        loadjs('/plugins/jquery/jquery.min.js', function () {
            loadjs('/plugins/bootstrap/js/bootstrap.bundle.min.js', function() {
                loadjs('/dist/js/adminlte.min.js', function() {
                        loadjs('/dist/js/demo.js');
                    })
            })
        })
    }
    onSubmit(values) {
        console.log(values);
        this.props.loginRequest(values);
    }
    render() {
        return (
            <div className="login-page limiter">
                <div className="login-page-container">
                <div className="login-box container-login100">

                    <div className=" card login-logo login100-pic col-sm-12 col-md-6 col-lg-6">
                        <a href="# "><img className='login-bg' src={'/img/login-bg.gif'}/></a>
                    </div>
                    {/* <!-- /.login-logo --> */}
                    <div className="card wrap-login100 col-sm-12 col-md-6 col-lg-6">
                        
                        <div className="card-body login-card-body">
                            <h3 className='form-title'>Admin Login</h3>
                            <LoginForm onSubmit={this.onSubmit.bind(this)}/>
                            
                            
                        </div>
                    </div>
                    {/* <!-- /.login-card-body --> */}
                </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{loginRequest})(LoginFormContainer);