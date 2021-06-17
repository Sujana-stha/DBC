// import React from 'react';


// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return (
//     <Route {...rest} render={props =>
//         Auth.getAuth() ? (
//             <Component {...props} />
//     ) : (
//     <Redirect to={{pathname: "/"}}/>
//     />
// )}

// export default PrivateRoute;

import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from './auth';

class PrivateRoute extends Component {

  render() {
    const { component: Component, ...rest } = this.props
    
    return (
      <Route
        {...rest}
        render={props =>
          isLogin()  ? 
        <Component {...props} />
        : <Redirect to="/auth/login"/>
        }
      />
    )
  }
}

export default (PrivateRoute);
