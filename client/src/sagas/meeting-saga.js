import {takeLatest, call, put } from 'redux-saga/effects';
// import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/meeting-api';
import * as meetingAction from '../actions/meeting-action';
import {notify} from 'react-notify-toast';


//Get MEETING data in table
export function* MeetingWatcher() {
    yield takeLatest(types.REQUEST_MEETING, MeetingSaga)
}
function* MeetingSaga(action) {
    const response = yield call(api.getMeetings, action.pageNumber);
    console.log('saga',response)
    const meetings = response.data
    let errors= {}
    if (response.errors) {
        yield put({ type: types.REQUEST_MEETING_FAILED, errors: response.error});
        errors = response.errors;
        notify.show("Cannot get all Meetings", "error", 5000)
    } else {
        yield put({type: types.GET_MEETING_SUCCESS, meetings});
    }
}


// delete MEETING data from table
export function* deleteMeetingsSaga() {
    yield takeLatest(types.REQUEST_DELETE_MEETING, callDeleteMeeting)
}

function* callDeleteMeeting(action) {
    const result = yield call(api.deleteMeetings, action.meetingId);
    let errors={}
    if(result.errors) {
        yield put({ type: types.REQUEST_MEETING_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(meetingAction.deleteMeetingSuccess(action.meetingId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

