import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { createBrowserHistory } from 'history';
import Login from './login';
import Register from './registerUser';
import RegisterActivity from './registerDuckFeedingActivity';
import Home from './home';

const history = createBrowserHistory();

export default class App extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
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
        );
    }
}
