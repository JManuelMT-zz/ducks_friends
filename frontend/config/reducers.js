import { combineReducers } from 'redux';

import { alertReducer as alert } from '../ducks/alert';
import { activitiesReducer as activities } from '../ducks/ducksFeedingActivities';
import { userReducer as user } from '../ducks/user';
import { loadingReducer as loading } from '../ducks/loading';

const rootReducer = combineReducers({
    alert,
    activities,
    user,
    loading,
});

export default rootReducer;
