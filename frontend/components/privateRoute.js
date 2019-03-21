import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = user.loginSuccesful;
    return (
        <Route
            path="/home"
            {...rest}
            render={props => (
                isLoggedIn
                    ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    location: PropTypes.shape({}),
};

export default PrivateRoute;
