import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    matchs: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const matchsReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated matchs
        case types.REQUEST_MATCH: 
            return {...state, fetching: true};
           
        case types.GET_MATCH_SUCCESS:
            return Object.assign({}, state, {
                matchs: action.matchs,
                fetching: false,
                itemsCountPerPage: action.matchs.per_page,
                totalItemsCount: action.matchs.total,
                activePage: action.matchs.current_page,
                sending: false
            })

        case types.DELETE_MATCH_SUCCESS:
            const newMatch = _.filter(state.matchs, match => match.id !== action.matchId);
            return Object.assign({}, state, {
                matchs: newMatch
            });

        default: 
        return state;
    }
}

export default matchsReducer;