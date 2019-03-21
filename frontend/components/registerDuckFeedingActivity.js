import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import ENDPOINT from '../../constants/endpoint';
import { REGISTER_ERROR, UNEXPECTED_ERROR } from '../../constants/appErrors';
import { ALERT_SUCCESS, ALERT_ERROR } from '../../constants/alertStyles';
import { actions as loadingActions } from '../ducks/loading';
import { actions as alertActions } from '../ducks/alert';
import history from '../../utils/history';

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkName: '',
            food: '',
            foodQuantity: '',
            date: '',
            time: '',
        };
        this.registerActivity = this.registerActivity.bind(this);
    }

    registerActivity(e) {
        e.preventDefault();
        const {
            parkName,
            food,
            foodQuantity,
            date,
            time,
        } = this.state;
        const {
            toggleLoading,
            userId,
        } = this.props;
        toggleLoading();
        const { setAlert } = this.props;
        if (!parkName || !food || !foodQuantity || !date || !time) {
            const alert = {
                styleClass: ALERT_ERROR,
                description: REGISTER_ERROR,
            };
            setAlert(alert);
            toggleLoading();
        } else {
            axios({
                url: `${ENDPOINT}/registerDucksFeeding`,
                method: 'post',
                data: {
                    parkName,
                    food,
                    foodQuantity,
                    date,
                    time,
                    userId,
                },
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.activityRegistered) {
                        const successRegister = 'Thanks a lot for give us that information!';
                        alert.styleClass = ALERT_SUCCESS;
                        alert.description = successRegister;
                        setAlert(alert);
                        history.push('/home');
                        toggleLoading();
                    } else {
                        alert.styleClass = ALERT_ERROR;
                        alert.description = UNEXPECTED_ERROR;
                        setAlert(alert);
                        toggleLoading();
                    }
                }).catch((error) => {
                    alert.styleClass = ALERT_ERROR;
                    alert.description = error.response.data.error;
                    setAlert(alert);
                    toggleLoading();
                });
        }
    }

    render() {
        return (
            <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 form_container">
                <div className="left_logo">
                    <img
                        alt=""
                        className="logo_register"
                        src="https://git.patxipierce.com/avatars/9f7dc601d67af6d4b291a05629afc20a"
                    />
                    <h5 className="register_title">
                        Thank you very much for telling us how you feed the ducks!
                    </h5>
                    <br />
                    <br />
                </div>
                <form className="form-row">
                    <div className="form-group col-md-4 vertical_space">
                        <span className="act_labels">
                            Park name
                        </span>
                        <input
                            type="text"
                            name="park"
                            className="form-control"
                            placeholder="Park name"
                            onChange={(e) => {
                                this.setState({
                                    parkName: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-4 vertical_space">
                        <span className="act_labels">
                            Food
                        </span>
                        <input
                            type="text"
                            name="food"
                            className="form-control"
                            placeholder="Food"
                            onChange={(e) => {
                                this.setState({
                                    food: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-4 vertical_space">
                        <span className="act_labels">
                            Food quantity
                        </span>
                        <input
                            type="number"
                            name="food_quantity"
                            className="form-control"
                            placeholder="Food quantity in grams"
                            onChange={(e) => {
                                this.setState({
                                    foodQuantity: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 vertical_space">
                        <span className="act_labels">
                            Date
                        </span>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            placeholder="date"
                            onChange={(e) => {
                                this.setState({
                                    date: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 vertical_space">
                        <span className="act_labels">
                            Time
                        </span>
                        <input
                            type="time"
                            name="time"
                            className="form-control"
                            placeholder="time"
                            onChange={(e) => {
                                this.setState({
                                    time: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <button type="submit" onClick={this.registerActivity} className="btn btn-primary btn-lg btn-block vertical_space">
                            Register Feeding Activity
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Activities.propTypes = {
    setAlert: PropTypes.func,
    toggleLoading: PropTypes.func,
    userId: PropTypes.string,
};

const mapStateToProps = ({ user }) => ({
    userId: user.userId,
});

const mapDispatchToProps = dispatch => ({
    setAlert: alert => dispatch(alertActions.setAlert(alert)),
    toggleLoading: () => dispatch(loadingActions.toggleLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
