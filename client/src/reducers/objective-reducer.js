import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    objectives: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const objectivesReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated objectives
        case types.REQUEST_OBJECTIVE: 
            return {...state, fetching: true};
           
        case types.GET_OBJECTIVE_SUCCESS:
            return Object.assign({}, state, {
                objectives: action.objectives,
                fetching: false,
                itemsCountPerPage: action.objectives.per_page,
                totalItemsCount: action.objectives.total,
                activePage: action.objectives.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_OBJECTIVE:
            return {...state, sending: true}

        case types.REQUEST_EDIT_OBJECTIVE:
            return {...state, sending: true}

        case types.EDIT_OBJECTIVE_SUCCESS:
            return {
                ...state, 
                objectives: state.objectives.map(objective => {
                    if (objective.id === action.resp.id) {
                    return action.resp;
                    }
                    return objective;
                }),
                sending: false
            };
            
        case types.DELETE_OBJECTIVE_SUCCESS:
            const newObjective = _.filter(state.objectives, objective => objective.id !== action.objectiveId);
            return Object.assign({}, state, {
                objectives: newObjective
            });

        default: 
        return state;
    }
}

export default objectivesReducer;