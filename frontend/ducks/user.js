import axios from 'axios';
import { user as initialState } from '../config/initialState.json';
import ENDPOINT from '../../constants/endpoint';
import { actions as alertActions } from './alert';
import { actions as spinnerActions } from './loading';
import { ALERT_ERROR } from '../../constants/alertStyles';
import { UNEXPECTED_ERROR } from '../../constants/appErrors';
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
    axios({
        url: `${ENDPOINT}/loginUser`,
        method: 'post',
        data: {
            username,
            password,
        },
    })
        .then((response) => {
            dispatch(spinnerActions.toggleLoading());
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            history.push('/home');
            if (response.data.loginSuccesful) {
                dispatch(setUser(response.data));
                history.push('/home');
            } else {
                const alert = {
                    styleClass: ALERT_ERROR,
                    description: UNEXPECTED_ERROR,
                };
                dispatch(alertActions.setAlert(alert));
            }
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

const logout = () => (dispatch) => {
    dispatch(alertActions.clearAlert());
    dispatch(spinnerActions.toggleLoading());
    axios.get(`${ENDPOINT}/logoutUser`, { withCredentials: true })
        .then(() => {
            const user = {
                isLoggedIn: false,
                id: '',
                username: '',
                name: '',
            };
            dispatch({
                type: ACTION_TYPES.SET_USER,
                user,
            });
            localStorage.removeItem('isLoggedIn');
            history.push('/login');
            dispatch(spinnerActions.toggleLoading());
        })
        .catch(() => {
            const alert = {
                styleClass: ALERT_ERROR,
                description: UNEXPECTED_ERROR,
            };
            dispatch(alertActions.setAlert(alert));
            dispatch(spinnerActions.toggleLoading());
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
    logout,
};
