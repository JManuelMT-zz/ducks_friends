import React from 'react';
import { PropTypes } from 'prop-types';

const Alert = ({ alertMessage, alertStyle }) => (
    <div className={alertStyle} role="alert">
        {alertMessage}
    </div>
);

Alert.propTypes = {
    alertMessage: PropTypes.string,
    alertStyle: PropTypes.string,
};

export default Alert;
