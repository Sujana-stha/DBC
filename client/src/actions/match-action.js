import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestMatch(pageNumber) {
    return {
        type: types.REQUEST_MATCH,
        pageNumber
        
    }
}

export function getMatchSuccess(matchs) {
    return {
        type: types.GET_MATCH_SUCCESS,
        matchs
    }
}

// CATEGORIES FAILED ACTION
export function requestMatchFailed() {
    return {
        type: types.REQUEST_MATCH_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddMatch(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_MATCH,
        values, pageNumber
    }
}

export function addMatchSuccess(values, message) {
    return {
        type: types.ADD_MATCH_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateMatch( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_MATCH,
        values, pageNumber
    }
}

export function updateMatchSuccess(matchId, values, message) {
    return {
        type: types.EDIT_MATCH_SUCCESS,
        values, matchId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteMatch(matchId) {
    return {
        type: types.REQUEST_DELETE_MATCH,
        matchId
    }
}

export function deleteMatchSuccess(matchId, message) {
    return {
        type: types.DELETE_MATCH_SUCCESS,
        matchId, message
    }
}

