import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestMeeting(pageNumber) {
    return {
        type: types.REQUEST_MEETING,
        pageNumber
        
    }
}

export function getMeetingSuccess(meetings) {
    return {
        type: types.GET_MEETING_SUCCESS,
        meetings
    }
}

// CATEGORIES FAILED ACTION
export function requestMeetingFailed() {
    return {
        type: types.REQUEST_MEETING_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddMeeting(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_MEETING,
        values, pageNumber
    }
}

export function addMeetingSuccess(values, message) {
    return {
        type: types.ADD_MEETING_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateMeeting( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_MEETING,
        values, pageNumber
    }
}

export function updateMeetingSuccess(meetingId, values, message) {
    return {
        type: types.EDIT_MEETING_SUCCESS,
        values, meetingId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteMeeting(meetingId) {
    return {
        type: types.REQUEST_DELETE_MEETING,
        meetingId
    }
}

export function deleteMeetingSuccess(meetingId, message) {
    return {
        type: types.DELETE_MEETING_SUCCESS,
        meetingId, message
    }
}

