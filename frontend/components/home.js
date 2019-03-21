import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import TableToExcel from '@linways/table-to-excel';
import { actions as activitiesActions } from '../ducks/ducksFeedingActivities';
import { actions as alertActions } from '../ducks/alert';

class Home extends Component {
    componentDidMount() {
        const {
            getActivities,
            clearAlert,
        } = this.props;
        getActivities();
        setTimeout(() => {
            clearAlert();
        }, 3000);
    }

    render() {
        const { activities, getActivities, userId } = this.props;
        return (
            <div className="table_container col-sm-12 col-md-10 offset-md-1 col-lg-9 offset-lg-1" align="center">
                <h4>
                    Welcome! this is the current register that we have
                    about ducks feeding in the world.
                    Please, help us to keep improving.
                </h4>
                <table id="myTable" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                Country
                            </th>
                            <th scope="col">
                                State
                            </th>
                            <th scope="col">
                                City
                            </th>
                            <th scope="col">
                                Park
                            </th>
                            <th scope="col">
                                Food
                            </th>
                            <th scope="col">
                                Quantity (grams)
                            </th>
                            <th scope="col">
                               #Ducks
                            </th>
                            <th scope="col">
                                Date
                            </th>
                            <th scope="col">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activities.map(act => (
                                act.ducks_feeding.map(activity => (
                                    <tr key={activity._id}>
                                        <td>
                                            {act.country}
                                        </td>
                                        <td>
                                            {act.state}
                                        </td>
                                        <td>
                                            {act.city}
                                        </td>
                                        <td>
                                            {activity.park_name}
                                        </td>
                                        <td>
                                            {activity.food}
                                        </td>
                                        <td>
                                            {activity.food_quantity}
                                        </td>
                                        <td>
                                            {activity.ducks_number}
                                        </td>
                                        <td>
                                            {activity.date.substr(0, 10)}
                                        </td>
                                        <td>
                                            {activity.time}
                                        </td>
                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                </table>
                <div className="form-row">
                    <button type="button" onClick={() => getActivities()} className="btn btn-primary btn-lg col btn_home">
                        See All
                    </button>
                    <button type="button" onClick={() => getActivities(userId)} className="btn btn-secondary col btn-lg btn_home">
                        My Activities
                    </button>
                    <Link className="col btn_home" to="/registerActivity">
                        <button to="/registerActivity" type="button" className="btn btn-outline-primary btn-lg">
                            New activity
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            TableToExcel.convert(document.getElementById('myTable'));
                        }}
                        className="btn btn-dark btn-lg col btn_home"
                    >
                            Get report
                    </button>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    activities: PropTypes.arrayOf(Object),
    getActivities: PropTypes.func,
    userId: PropTypes.string,
    clearAlert: PropTypes.func,
};

const mapStateToProps = state => ({
    activities: state.ducksFeedingActivities,
    userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
    getActivities: userId => dispatch(activitiesActions.getActivities(userId)),
    clearAlert: () => dispatch(alertActions.clearAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
