import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestInterests(pageNumber) {
    return {
        type: types.REQUEST_INTEREST,
        pageNumber
        
    }
}

export function getInterestsSuccess(interest) {
    return {
        type: types.GET_INTEREST_SUCCESS,
        interest
    }
}

// CATEGORIES FAILED ACTION
export function requestInterestsFailed() {
    return {
        type: types.REQUEST_INTEREST_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddInterests(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_INTEREST,
        values, pageNumber
    }
}

export function addInterestsSuccess(values, message) {
    return {
        type: types.ADD_INTEREST_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateInterests( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_INTEREST,
        values, pageNumber
    }
}

export function updateInterestsSuccess(interestId, values, message) {
    return {
        type: types.EDIT_INTEREST_SUCCESS,
        values, interestId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteInterests(interestId) {
    return {
        type: types.REQUEST_DELETE_INTEREST,
        interestId
    }
}

export function deleteInterestsSuccess(interestId, message) {
    return {
        type: types.DELETE_INTEREST_SUCCESS,
        interestId, message
    }
}

