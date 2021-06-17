import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/profile-api';
import {notify} from 'react-notify-toast';
import * as profileAction from '../actions/profile-action'

//Get PROFILE data in table
export function* ProfileWatcher() {
    yield takeLatest(types.REQUEST_PROFILE, profileSaga)
}
function* profileSaga(action) {
    const response = yield call(api.getProfile, action.pageNumber);
    console.log(response)
    const profiles = response.data
    let errors= {}
    if (response.errors) {
        yield put({ type: types.REQUEST_PROFILE_FAILED, errors: response.error});
        errors = response.errors;
        notify.show("Cannot get all Profile", "error", 5000)
    } else {
        yield put({type: types.GET_PROFILE_SUCCESS, profiles});
    }
}

// delete PRofile data from table
export function* deleteProfileSaga() {
    yield takeLatest(types.REQUEST_DELETE_USERS, callDeleteProfile)
}
function* callDeleteProfile(action) {
    const result = yield call(api.deleteProfile, action.profileId);
    let errors={}
    if(result.errors) {
        yield put({ type: types.REQUEST_USERS_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(profileAction.deleteProfileSuccess(action.profileId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

