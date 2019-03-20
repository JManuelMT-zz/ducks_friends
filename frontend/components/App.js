import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Login from './login';
import Register from './registerUser';
import PrivateRoute from './privateRoute';
import RegisterActivity from './registerDuckFeedingActivity';
import Home from './home';
import Alert from './alert';
import Header from './header';
import Spinner from './spinner';
import history from '../../utils/history';
import ENDPOINT from '../../constants/endpoint';
import { actions as userActions } from '../ducks/user';

class App extends Component {
    componentDidMount() {
        const userLocal = localStorage.getItem('user');
        if (userLocal) {
            const user = JSON.parse(userLocal);
            const { setUser } = this.props;
            setUser(user);
            // history.push('/home');
        }
    }

    render() {
        const {
            alert,
            loading,
        } = this.props;
        return (
            <div>
                {
                    window.location.pathname === '/home'
                    || window.location.pathname === '/registerActivity' ? <Header /> : ''
                }
                <div className="container">
                    <Spinner loading={loading} />
                    <div className="row">
                        <div className="col-sm-12">
                            <Alert alertMessage={alert.description} alertStyle={alert.styleClass} />
                            <Router history={history}>
                                <Switch>
                                    <Route path="/login" component={Login} />
                                    <Route path="/register" component={Register} />
                                    <Route path="/registerActivity" component={RegisterActivity} />
                                    <Route path="/home" component={Home} />
                                    <PrivateRoute component={Home} />
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    alert: PropTypes.shape({}),
    loading: PropTypes.bool,
    setUser: PropTypes.func,
};

const mapStateToProps = ({ alert, loading, user }) => ({ alert, loading, user });

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(userActions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
