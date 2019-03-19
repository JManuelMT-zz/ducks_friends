import axios from 'axios';
import { user as initialState } from '../config/initialState.json';
import ENDPOINT from '../../constants/endpoint';
import { actions as alertActions } from './alert';
import { actions as spinnerActions } from './loading';
import { ALERT_ERROR } from '../../constants/alertStyles';
import history from '../../utils/history';

const ACTION_TYPES = {
    SET_USER: 'SET_USER',
};

const setUser = user => ({
    type: ACTION_TYPES.SET_USER,
    user,
});

const doLogin = (username, password) => (dispatch) => {
    dispatch(alertActions.clearAlert());
    dispatch(spinnerActions.toggleLoading());
    axios.post(`${ENDPOINT}/loginUser`, {
        username,
        password,
    })
        .then((response) => {
            dispatch(spinnerActions.toggleLoading());
            dispatch(setUser(response));
            history.push('/home');
        })
        .catch((error) => {
            dispatch(spinnerActions.toggleLoading());
            const alert = {
                styleClass: ALERT_ERROR,
                description: error.response.data.error,
            };
            dispatch(alertActions.setAlert(alert));
        });
};

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
    doLogin,
};
