import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/interest-api';
import * as interestAction from '../actions/interest-action';
import {notify} from 'react-notify-toast';


//Get INTEREST data in table
export function* InterestWatcher() {
    yield takeLatest(types.REQUEST_INTEREST, InterestSaga)
}
function* InterestSaga() {

    const response = yield call(api.getInterest);
    console.log(response)
    const interests = response.data

    let errors= {}
    if (response.errors) {
        yield put({ type: types.REQUEST_INTEREST_FAILED, errors: response.error});
        errors = response.errors;
        notify.show("Cannot get all Interests", "error", 5000)
    } else {
        yield put({type: types.GET_INTEREST_SUCCESS, interests});
    }
}

// Submit form data of INTEREST
export function* submitInterestsSaga() {
    yield takeLatest(types.REQUEST_ADD_INTEREST, callInterestsSubmit)
}
function* callInterestsSubmit(action) {
    yield put(startSubmit('AddInterest'));
    const result =  yield call(api.addInterest, action.values);
    // const resp = result.data
    const pageNumber= action.pageNumber
    let errors  = {}

    if (result.errors) {
        yield put({ type: types.REQUEST_INTEREST_FAILED, errors: result.errors});
        
        errors = result.errors
        notify.show("Cannot create new Interests!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_INTEREST, pageNumber})
        notify.show("Interest created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddInterest', errors));
    yield put(reset('AddInterest'));
}

//edit form data of INTEREST
export function* editInterestSaga() {
    yield takeLatest(types.REQUEST_EDIT_INTEREST, callEditInterest);
}

function* callEditInterest (action) {
    
    yield put(startSubmit('EditInterest'));
    const result =  yield call(api.updateInterest, action.values.id, action.values);
    const pageNumber= action.pageNumber
    let error = {} 
    
    if (result.errors) {
        yield put({ type: types.REQUEST_INTEREST_FAILED, error: result.error});
        notify.show("Update failed", "error", 5000)
        error = result.errors
    
    } else {
        yield put({type: types.REQUEST_INTEREST, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditInterest', error));
    yield put(reset('EditInterest'));

}

// delete INTEREST data from table
export function* deleteInterestSaga() {
    yield takeLatest(types.REQUEST_DELETE_INTEREST, callDeleteInterest)
}

function* callDeleteInterest(action) {
    console.log(action)
    const result = yield call(api.deleteInterest, action.interestId);
    let errors={}
    console.log(result)
    // const resp = result.success
    if(result.errors) {
        yield put({ type: types.REQUEST_INTEREST_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else{
        yield put(interestAction.deleteInterestsSuccess(action.interestId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

