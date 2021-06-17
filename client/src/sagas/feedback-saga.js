import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/feedback-api';
import * as feedbackAction from '../actions/feedback-action';
import {notify} from 'react-notify-toast';


//Get FEEDBACKS data in table
export function* FeedbackWatcher() {
    yield takeLatest(types.REQUEST_FEEDBACKS, FeedbackSaga)
}
function* FeedbackSaga(action) {
    const response = yield call(api.getFeedbacks, action.pageNumber);
    console.log(response)
    const feedbacks = response.data
    let errors= {}
    if (response.errors) {
        yield put({ type: types.REQUEST_FEEDBACKS_FAILED, errors: response.error});
        errors = response.errors;
        notify.show("Cannot get all Feedbacks", "error", 5000)
    } else {
        yield put({type: types.GET_FEEDBACKS_SUCCESS, feedbacks});
    }
}

// Submit form data of FEEDBACKS
export function* submitFeedbacksSaga() {
    yield takeLatest(types.REQUEST_ADD_FEEDBACKS, callFeedbacksSubmit)
}
function* callFeedbacksSubmit(action) {
    yield put(startSubmit('AddFeedbacks'));
    const result =  yield call(api.addFeedbacks, action.values);
    // const resp = result.data
    const pageNumber= action.pageNumber
    let errors  = {}

    if (result.errors) {
        yield put({ type: types.REQUEST_FEEDBACKS_FAILED, errors: result.errors});
        if(result.errors.email.length) {
            notify.show("The email has already been taken","error", 5000);
        }
        errors = result.errors
        notify.show("Cannot create new Feedbacks!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_FEEDBACKS, pageNumber})
        notify.show("Feedback created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddFeedback', errors));
    yield put(reset('AddFeedback'));
}

//edit form data of FEEDBACKS
export function* editFeedbacksSaga() {
    yield takeLatest(types.REQUEST_EDIT_FEEDBACKS, callEditFeedback);
}

function* callEditFeedback (action) {
    
    yield put(startSubmit('EditFeedbacks'));
    const result =  yield call(api.updateFeedbacks, action.values.id, action.values);
    const pageNumber= action.pageNumber
    let error = {} 
    
    if (result.errors) {
        yield put({ type: types.REQUEST_FEEDBACKS_FAILED, error: result.error});
        notify.show("Update failed", "error", 5000)
        error = result.errors
    
    } else {
        yield put({type: types.REQUEST_FEEDBACKS, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditFeedbacks', error));
    yield put(reset('EditFeedbacks'));

}

// delete FEEDBACKS data from table
export function* deleteFeedbacksSaga() {
    yield takeLatest(types.REQUEST_DELETE_FEEDBACKS, callDeleteFeedback)
}

function* callDeleteFeedback(action) {
    const result = yield call(api.deleteFeedbacks, action.feedbackId);
    let errors={}
    if(result.errors) {
        yield put({ type: types.REQUEST_FEEDBACKS_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(feedbackAction.deletefeedbacksSuccess(action.feedbackId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

