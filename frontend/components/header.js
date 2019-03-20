import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/user';

const Header = ({ name, logout }) => (
    <nav className="navbar navbar-dark bg-primary">
        <img
            alt=""
            className="logo_home"
            src="https://git.patxipierce.com/avatars/9f7dc601d67af6d4b291a05629afc20a"
        />
        <h5 className="header_name">
            {`Hi ${name}!`}
        </h5>
        <button type="button" className="btn btn_header" onClick={() => logout()}>
            Logout
        </button>
    </nav>
);

Header.propTypes = {
    name: PropTypes.string,
    logout: PropTypes.func,
};

const mapStateToProps = state => ({
    name: state.user.name,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
