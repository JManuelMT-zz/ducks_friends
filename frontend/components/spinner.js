import React from 'react';
import { PropTypes } from 'prop-types';

const Spinner = ({ loading }) => (
    <div>
        {
            loading
            && (
                <div className="spinner">
                    <div className="loader" />
                </div>)
        }
    </div>
);

Spinner.propTypes = {
    loading: PropTypes.bool,
};

export default Spinner;
