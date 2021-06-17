import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Notifications from 'react-notify-toast'
//login form

import LoginContainer from '../containers/login/login-container';

const UnauthorizedLayout =(props)=> (
    <div>
        <Notifications options = {{top:'20px', right:'0px', width: '100%', margin:0, left: 'none'}}/>
        <Switch>
            <Route path="/auth/login" component={LoginContainer}/>
            <Redirect to ="/"/>
        </Switch>
    </div>
)
 export default UnauthorizedLayout;