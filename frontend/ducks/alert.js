const initialState = require('../config/initialState.json').alert;

const ACTION_TYPES = {
    SET_ALERT: 'SET_ALERT',
    CLEAR_ALERT: 'CLEAR_ALERT',
};

const setAlert = alert => dispatch => (
    dispatch({
        type: ACTION_TYPES.SET_ALERT,
        alert,
    })
);

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ALERT:
            return {
                ...action.alert,
            };
        case ACTION_TYPES.CLEAR_ALERT:
            return {
                styleClass: '',
                description: '',
            };
        default:
            return state;
    }
};

export const actions = {
    setAlert,
};
