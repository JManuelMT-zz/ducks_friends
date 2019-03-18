const initialState = require('../config/initialState.json').ducksFeedingActivities;

const ACTION_TYPES = {
    SET_ACTIVITIES: 'SET_ACTIVITIES',
};

const setActivities = activities => dispatch => (
    dispatch({
        type: ACTION_TYPES.SET_ACTIVITIES,
        activities,
    })
);

export const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ACTIVITIES:
            return [state.ducksFeedingActivities, ...action.activities];
        default:
            return state;
    }
};

export const actions = {
    setActivities,
};
