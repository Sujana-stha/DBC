import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    feedbacks: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const feedbacksReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated feedbacks
        case types.REQUEST_FEEDBACKS: 
            return {...state, fetching: true};
           
        case types.GET_FEEDBACKS_SUCCESS:
            return Object.assign({}, state, {
                feedbacks: action.feedbacks,
                fetching: false,
                itemsCountPerPage: action.feedbacks.per_page,
                totalItemsCount: action.feedbacks.total,
                activePage: action.feedbacks.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_FEEDBACKS:
            return {...state, sending: true}

        case types.REQUEST_EDIT_FEEDBACKS:
            return {...state, sending: true}

        case types.EDIT_FEEDBACKS_SUCCESS:
            return {
                ...state, 
                feedbacks: state.feedbacks.map(feedback => {
                    if (feedback.id === action.resp.id) {
                    return action.resp;
                    }
                    return feedback;
                }),
                sending: false
            };
            
        case types.DELETE_FEEDBACKS_SUCCESS:
            const newFeedback = _.filter(state.feedbacks, feedback => feedback.id !== action.feedbackId);
            return Object.assign({}, state, {
                feedbacks: newFeedback
            });

        default: 
        return state;
    }
}

export default feedbacksReducer;