import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    meetings: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const meetingsReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated meetings
        case types.REQUEST_MEETING: 
            return {...state, fetching: true};
           
        case types.GET_MEETING_SUCCESS:
            return Object.assign({}, state, {
                meetings: action.meetings,
                fetching: false,
                itemsCountPerPage: action.meetings.per_page,
                totalItemsCount: action.meetings.total,
                activePage: action.meetings.current_page,
                sending: false
            })

        case types.DELETE_MEETING_SUCCESS:
            const newMeeting = _.filter(state.meetings, meeting => meeting.id !== action.meetingId);
            return Object.assign({}, state, {
                meetings: newMeeting
            });

        default: 
        return state;
    }
}

export default meetingsReducer;