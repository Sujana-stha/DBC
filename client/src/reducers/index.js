import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import usersReducer from './users-reducers';
import loginReducer from './login-reducers';
import profileReducer from './profile-reducer';
import interestsReducer from './Interest-reducer';
import obejectiveReducer from './objective-reducer';
import meetingReducer from './meeting-reducer';
import feedbackReducer from './feedback-reducer';
import matchReducer from './match-reducer';

const rootReducer = (history) => combineReducers({
    form: formReducer,
    router: connectRouter(history),

    loginState: loginReducer,
    userState: usersReducer,
    profileState: profileReducer,
    interestState: interestsReducer,
    objectiveState: obejectiveReducer,
    meetingState: meetingReducer,
    feedbackState: feedbackReducer,
    matchState: matchReducer
    
});

export default rootReducer;