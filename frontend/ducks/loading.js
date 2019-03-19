import { loading as initialState } from '../config/initialState.json';

const ACTION_TYPES = {
    TOGGLE_LOADING: 'TOGGLE_LOADING',
};

const toggleLoading = () => ({ type: ACTION_TYPES.TOGGLE_LOADING });

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_LOADING:
            return !state;
        default:
            return state;
    }
};

export const actions = {
    toggleLoading,
};
