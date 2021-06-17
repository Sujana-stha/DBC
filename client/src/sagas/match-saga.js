import {takeLatest, call, put } from 'redux-saga/effects';
// import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/match-api';
import * as matchAction from '../actions/match-action';
import {notify} from 'react-notify-toast';


//Get MATCH data in table
export function* MatchWatcher() {
    yield takeLatest(types.REQUEST_MATCH, MatchSaga)
}
function* MatchSaga(action) {
    const response = yield call(api.getMatchs, action.pageNumber);
    console.log('saga',response)
    const matchs = response.data
    let errors= {}
    if (response.errors) {
        yield put({ type: types.REQUEST_MATCH_FAILED, errors: response.error});
        errors = response.errors;
        notify.show("Cannot get all Matchs", "error", 5000)
    } else {
        yield put({type: types.GET_MATCH_SUCCESS, matchs});
    }
}


// delete MATCH data from table
export function* deleteMatchsSaga() {
    yield takeLatest(types.REQUEST_DELETE_MATCH, callDeleteMatch)
}

function* callDeleteMatch(action) {
    const result = yield call(api.deleteMatchs, action.matchId);
    let errors={}
    if(result.errors) {
        yield put({ type: types.REQUEST_MATCH_FAILED, errors: result.errors});
        errors = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(matchAction.deleteMatchSuccess(action.matchId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

