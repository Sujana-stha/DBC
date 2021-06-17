import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    profiles: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const profileReducer = function (state = initialState, action) {
    switch (action.type) {

        // reducer to get paginated profiles
        case types.REQUEST_PROFILE:
            return { ...state, fetching: true };

        case types.GET_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                profiles: action.profiles,
                fetching: false,
                itemsCountPerPage: action.profiles.per_page,
                totalItemsCount: action.profiles.total,
                activePage: action.profiles.current_page,
                sending: false
            })
        case types.DELETE_PROFILE_SUCCESS:
            const newProfile = _.filter(state.profiles, profile => profile.id !== action.profileId);
            return Object.assign({}, state, {
                profiles: newProfile
            });

        default:
            return state;
    }
}

export default profileReducer;