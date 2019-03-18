import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class RegisterActivity extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                hi registerActivity!!!
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterActivity);
