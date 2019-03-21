import axios from 'axios';
import { ducksFeedingActivities as initialState } from '../config/initialState.json';
import { ALERT_ERROR } from '../../../constants/alertStyles';
import { actions as alertActions } from './alert';
import ENDPOINT from '../../../constants/endpoint';
import { actions as spinnerActions } from './loading';

const ACTION_TYPES = {
    SET_ACTIVITIES: 'SET_ACTIVITIES',
};

const setActivities = activities => dispatch => (
    dispatch({
        type: ACTION_TYPES.SET_ACTIVITIES,
        activities,
    })
);

const getActivities = userId => (dispatch) => {
    dispatch(spinnerActions.toggleLoading());
    const param = !userId ? 'getFeedingDucksActivities' : `getFeedingDucksActivities/${userId}`;
    axios.get(`${ENDPOINT}/${param}`, {
        withCredentials: true,
    })
        .then((response) => {
            dispatch(spinnerActions.toggleLoading());
            dispatch(setActivities(response.data));
        })
        .catch((error) => {
            dispatch(spinnerActions.toggleLoading());
            const alert = {
                styleClass: ALERT_ERROR,
                description: error.response.data.message,
            };
            dispatch(alertActions.setAlert(alert));
        });
};

export const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ACTIVITIES:
            return action.activities;
        default:
            return state;
    }
};

export const actions = {
    setActivities,
    getActivities,
};
