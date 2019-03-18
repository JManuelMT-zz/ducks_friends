const initialState = require('../config/initialState.json').user;

const ACTION_TYPES = {
    SET_USER: 'SET_USER',
};

const setUser = user => dispatch => (
    dispatch({
        type: ACTION_TYPES.SET_USER,
        user,
    })
);

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return {
                ...action.user,
            };
        default:
            return state;
    }
};

export const actions = {
    setUser,
};
