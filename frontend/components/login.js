import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actions } from '../ducks/user';
import Error from './error';
import { EMAIL_REQUIRED, PASSWORD_REQUIRED, INVALID_EMAIL } from '../../constants/appErrors';
import validateEmail from '../../utils/validateEmail';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorUsername: '',
            errorPassword: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'username') {
            this.setState({
                username: e.target.value,
                errorUsername: '',
            });
        }
        if (e.target.name === 'password') {
            this.setState({
                password: e.target.value,
                errorPassword: '',
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { doLogin } = this.props;
        const {
            username,
            password,
        } = this.state;
        if (!username || !password) {
            const userError = !username ? EMAIL_REQUIRED : '';
            const passError = !password ? PASSWORD_REQUIRED : '';
            this.setState({
                errorUsername: userError,
                errorPassword: passError,
            });
        } else {
            const validEmail = validateEmail(username);
            if (validEmail) {
                doLogin(username, password);
            } else {
                this.setState({
                    errorUsername: INVALID_EMAIL,
                });
            }
        }
    }

    render() {
        const {
            errorUsername,
            errorPassword,
        } = this.state;
        return (
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 form_container">
                <div className="center_logo">
                    <img
                        alt=""
                        className="logo"
                        src="https://git.patxipierce.com/avatars/9f7dc601d67af6d4b291a05629afc20a"
                    />
                </div>
                <h2 className="title">
                    { /* eslint-disable-next-line react/no-unescaped-entities */ }
                    Ducks's Friends
                </h2>
                <br />
                <form>
                    <div className="form-group">
                        <input type="email" onChange={this.handleChange} name="username" className="form-control" placeholder="Enter email" />
                        <Error error={errorUsername} />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={this.handleChange} name="password" className="form-control" placeholder="Password" />
                        <Error error={errorPassword} />
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block">
                        Login
                    </button>
                    <br />
                    <div align="center">
                        Do not have an account yet?
                        <Link className="link" to="/register">
                            <strong>
                                {' Register here'}
                            </strong>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    doLogin: PropTypes.func,
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    doLogin: (username, password) => dispatch(actions.doLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
