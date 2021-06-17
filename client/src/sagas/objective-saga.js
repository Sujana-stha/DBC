import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/objectives-api';
import * as objectiveAction from '../actions/objective-action';
import {notify} from 'react-notify-toast';


//Get OBJECTIVE data in table
export function* ObjectiveWatcher() {
    yield takeLatest(types.REQUEST_OBJECTIVE, ObjectiveSaga)
}
function* ObjectiveSaga(action) {
    const response = yield call(api.getObjective, action.pageNumber);
    console.log(response)
    const objectives = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_OBJECTIVE_FAILED, errors: response.error});
        notify.show("Cannot get all Objectives", "error", 5000)
    } else {
        yield put({type: types.GET_OBJECTIVE_SUCCESS, objectives});
    }
}

// Submit form data of OBJECTIVE
export function* submitObjectivesSaga() {
    yield takeLatest(types.REQUEST_ADD_OBJECTIVE, callObjectivesSubmit)
}
function* callObjectivesSubmit(action) {
    yield put(startSubmit('AddObjective'));
    const result =  yield call(api.addObjective, action.values);
    // const resp = result.data
    const pageNumber= action.pageNumber
    let errors  = {}

    if (result.errors) {
        yield put({ type: types.REQUEST_OBJECTIVE_FAILED, errors: result.errors});
        errors = result.errors
        notify.show("Cannot create new Objectives!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_OBJECTIVE, pageNumber})
        notify.show("Objective created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddObjective', errors));
    yield put(reset('AddObjective'));
}

//edit form data of OBJECTIVE
export function* editObjectivesSaga() {
    yield takeLatest(types.REQUEST_EDIT_OBJECTIVE, callEditObjective);
}

function* callEditObjective (action) {
    
    yield put(startSubmit('EditObjective'));
    const result =  yield call(api.updateObjective, action.values.id, action.values);
    const pageNumber= action.pageNumber
    let error = {} 
    
    if (result.errors) {
        yield put({ type: types.REQUEST_OBJECTIVE_FAILED, error: result.error});
        notify.show("Update failed", "error", 5000)
        error = result.errors
    
    } else {
        yield put({type: types.REQUEST_OBJECTIVE, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditObjective', error));
    yield put(reset('EditObjective'));

}

// delete OBJECTIVE data from table
export function* deleteObjectivesSaga() {
    yield takeLatest(types.REQUEST_DELETE_OBJECTIVE, callDeleteObjective)
}

function* callDeleteObjective(action) {
    const result = yield call(api.deleteObjective, action.objectiveId);
    let errors={}
    if(result.errors) {
        yield put({ type: types.REQUEST_OBJECTIVE_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(objectiveAction.deleteObjectiveSuccess(action.objectiveId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

