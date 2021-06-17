import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestProfile(pageNumber) {
    return {
        type: types.REQUEST_PROFILE,
        pageNumber
        
    }
}

export function getProfileSuccess(profiles) {
    return {
        type: types.GET_PROFILE_SUCCESS,
        profiles
    }
}

// CATEGORIES FAILED ACTION
export function requestProfileFailed() {
    return {
        type: types.REQUEST_PROFILE_FAILED
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteProfile(profileId) {
    return {
        type: types.REQUEST_DELETE_PROFILE,
        profileId
    }
}

export function deleteProfileSuccess(profileId, message) {
    return {
        type: types.DELETE_PROFILE_SUCCESS,
        profileId, message
    }
}

