import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestfeedbacks(pageNumber) {
    return {
        type: types.REQUEST_FEEDBACKS,
        pageNumber
        
    }
}

export function getfeedbacksSuccess(feedbacks) {
    return {
        type: types.GET_FEEDBACKS_SUCCESS,
        feedbacks
    }
}

// CATEGORIES FAILED ACTION
export function requestfeedbacksFailed() {
    return {
        type: types.REQUEST_FEEDBACKS_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddfeedbacks(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_FEEDBACKS,
        values, pageNumber
    }
}

export function addfeedbacksSuccess(values, message) {
    return {
        type: types.ADD_FEEDBACKS_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdatefeedbacks( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_FEEDBACKS,
        values, pageNumber
    }
}

export function updatefeedbacksSuccess(feedbackId, values, message) {
    return {
        type: types.EDIT_FEEDBACKS_SUCCESS,
        values, feedbackId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeletefeedbacks(feedbackId) {
    return {
        type: types.REQUEST_DELETE_FEEDBACKS,
        feedbackId
    }
}

export function deletefeedbacksSuccess(feedbackId, message) {
    return {
        type: types.DELETE_FEEDBACKS_SUCCESS,
        feedbackId, message
    }
}

