import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        path="/home"
        {...rest}
        render={props => (
            localStorage.getItem('isLoggedIn')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    location: PropTypes.shape({}),
};

export default PrivateRoute;
