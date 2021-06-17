import {all, fork} from 'redux-saga/effects';

//SAGA FILE
import * as loginSaga from './login-saga';
import * as userSaga from './users-saga';
import * as profileSaga from './profile-saga';
import * as interestSaga from './interest-saga';
import * as objectiveSaga from './objective-saga'; 
import * as meetingSaga from './meeting-saga';
import * as feedbackSaga from './feedback-saga';
import * as matchSaga from './match-saga'
export default function* rootSaga() {
    yield all (
        [
            ...Object.values(loginSaga),
            ...Object.values(userSaga),
            ...Object.values(profileSaga),
            ...Object.values(interestSaga),
            ...Object.values(objectiveSaga),
            ...Object.values(meetingSaga),
            ...Object.values(feedbackSaga),
            ...Object.values(matchSaga)
        ].map(fork)
    );
}