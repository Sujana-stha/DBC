import {takeLatest, call, put} from 'redux-saga/effects';
import {startSubmit, stopSubmit, reset} from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/login-api';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';
// import {browserHistory} from 'react-router-dom';

// LOGIN REQUEST
export function* loginWatcher() {
    yield takeLatest(types.REQUEST_LOGIN, loginFlow)
}

function* loginFlow(action) {
    yield put(startSubmit('LoginForm'))
    try {
        const result =  yield call(api.login, action.data)
        const resp= result.data;
        var now = new Date().getTime();
        console.log('saga',resp.data.email);
        
        if(resp.success && resp.data.email == "admin@gmail.com") {
            window.localStorage.setItem("access_token", resp.accesstoken);
            localStorage.setItem('setupTime', now)
            
            yield put({ type: types.LOGIN_SUCCESS, resp});
            yield put(push('/'));
            notify.show("Login Successfull!", "success", 5000);
        } else if(result.errors || resp.error) {
            notify.show("Incorrect Email or Password!","error",5000);
            localStorage.clear();
        } else {
            notify.show("Incorrect Email or Password!", "error", 5000);
        }
       
    } catch(error) {
        yield put({type: types.LOGIN_ERROR, error})
        notify.show("Cannot Login!", "error", 5000);
    }
    yield put(stopSubmit('LoginForm')); 
    yield put(reset('LoginForm'));
}


//LOGOUT
//logout Request

export function* logoutWatcher() {
    yield takeLatest(types.LOGOUT_REQUEST, logoutFlow)
}

function* logoutFlow() {
    try {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('setupTime');
            
            yield put({type: types.LOGOUT_SUCCESS})
            yield put(push('/auth/login'));
            notify.show("You are successfully logged out!", "success", 5000)
            window.reload();
        
    } 
    catch (error) {
        yield put({type: types.LOGOUT_ERROR, error})
        notify.show("Something went wrong. Please try again!", "error", 5000)
    }
}