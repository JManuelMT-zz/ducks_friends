import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Login from './login';
import Register from './registerUser';
import RegisterActivity from './registerDuckFeedingActivity';
import Home from './home';
import Alert from './alert';
import Spinner from './spinner';
import history from '../../utils/history';

class App extends Component {
    componentWillMount() {

    }

    render() {
        const {
            alert,
            loading,
        } = this.props;
        return (
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
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    alert: PropTypes.shape({}),
    loading: PropTypes.bool,
};

const mapStateToProps = ({ alert, loading }) => ({ alert, loading });

export default connect(mapStateToProps, null)(App);
