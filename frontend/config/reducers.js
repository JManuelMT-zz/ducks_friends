import { combineReducers } from 'redux';

import { alertReducer } from '../ducks/alert';
import { activitiesReducer } from '../ducks/ducksFeedingActivities';
import { userReducer } from '../ducks/user';

const rootReducer = combineReducers({
    alertReducer,
    activitiesReducer,
    userReducer,
});

export default rootReducer;
