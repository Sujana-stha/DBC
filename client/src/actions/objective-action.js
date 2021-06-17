import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestObjectives(pageNumber) {
    return {
        type: types.REQUEST_OBJECTIVE,
        pageNumber
        
    }
}

export function getObjectiveSuccess(objective) {
    return {
        type: types.GET_OBJECTIVE_SUCCESS,
        objective
    }
}

// CATEGORIES FAILED ACTION
export function requestObjectiveFailed() {
    return {
        type: types.REQUEST_OBJECTIVE_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddObjective(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_OBJECTIVE,
        values, pageNumber
    }
}

export function addObjectiveSuccess(values, message) {
    return {
        type: types.ADD_OBJECTIVE_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateObjective( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_OBJECTIVE,
        values, pageNumber
    }
}

export function updateObjectiveSuccess(objectiveId, values, message) {
    return {
        type: types.EDIT_OBJECTIVE_SUCCESS,
        values, objectiveId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteObjective(objectiveId) {
    return {
        type: types.REQUEST_DELETE_OBJECTIVE,
        objectiveId
    }
}

export function deleteObjectiveSuccess(objectiveId, message) {
    return {
        type: types.DELETE_OBJECTIVE_SUCCESS,
        objectiveId, message
    }
}

