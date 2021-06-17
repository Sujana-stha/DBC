import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    interests: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const interestsReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated interests
        case types.REQUEST_INTEREST: 
            return {...state, fetching: true};
           
        case types.GET_INTEREST_SUCCESS:
            return Object.assign({}, state, {
                interests: action.interests,
                fetching: false,
                itemsCountPerPage: action.interests.per_page,
                totalItemsCount: action.interests.total,
                activePage: action.interests.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_INTEREST:
            return {...state, sending: true}

        case types.REQUEST_EDIT_INTEREST:
            return {...state, sending: true}

        case types.EDIT_INTEREST_SUCCESS:
            return {
                ...state, 
                interests: state.interests.map(interest => {
                    if (interest.id === action.resp.id) {
                    return action.resp;
                    }
                    return interest;
                }),
                sending: false
            };
            
        case types.DELETE_INTEREST_SUCCESS:
            const newInterest = _.filter(state.interests, interest => interest.id !== action.interestId);
            return Object.assign({}, state, {
                interests: newInterest
            });

        default: 
        return state;
    }
}

export default interestsReducer;