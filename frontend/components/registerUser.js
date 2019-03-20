import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import ENDPOINT from '../../constants/endpoint';
import { REGISTER_ERROR, INVALID_EMAIL, UNEXPECTED_ERROR } from '../../constants/appErrors';
import { ALERT_SUCCESS, ALERT_ERROR } from '../../constants/alertStyles';
import { actions as loadingActions } from '../ducks/loading';
import { actions as alertActions } from '../ducks/alert';
import validateEmail from '../../utils/validateEmail';
import history from '../../utils/history';
import Error from './error';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountry: '',
            states: [],
            selectedState: '',
            cities: [],
            selectedCity: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            errorEmail: '',
        };
        this.getStates = this.getStates.bind(this);
        this.getCities = this.getCities.bind(this);
        this.doRegister = this.doRegister.bind(this);
    }

    componentDidMount() {
        const { toggleLoading } = this.props;
        toggleLoading();
        axios.get(`${ENDPOINT}/getCountries`)
            .then((response) => {
                this.setState({
                    countries: response.data,
                });
                toggleLoading();
            })
            .catch((error) => {
                console.log(error);
                toggleLoading();
            });
    }

    getStates(e) {
        const { clearAlert } = this.props;
        clearAlert();
        const countryCode = e.target.value;
        this.setState({
            selectedCountry: countryCode,
        });
        const { toggleLoading } = this.props;
        toggleLoading();
        axios.get(`${ENDPOINT}/getStates/${countryCode}`)
            .then((response) => {
                this.setState({
                    states: response.data,
                });
                toggleLoading();
            })
            .catch((error) => {
                console.log(error);
                toggleLoading();
            });
    }

    getCities(e) {
        const { clearAlert } = this.props;
        clearAlert();
        const region = e.target.value;
        const {
            selectedCountry,
        } = this.state;
        this.setState({
            selectedState: region,
        });
        const { toggleLoading } = this.props;
        toggleLoading();
        axios.get(`${ENDPOINT}/getCities/${selectedCountry}/${region}`)
            .then((response) => {
                this.setState({
                    cities: response.data,
                });
                toggleLoading();
            })
            .catch((error) => {
                console.log(error);
                toggleLoading();
            });
    }

    doRegister(e) {
        e.preventDefault();
        const {
            selectedCity,
            selectedState,
            selectedCountry,
            username,
            password,
            firstname,
            lastname,
        } = this.state;

        const errorEmail = validateEmail(username);
        if (!errorEmail) {
            this.setState({
                errorEmail: INVALID_EMAIL,
            });
        }

        const { setAlert } = this.props;
        if (!selectedCountry || !selectedState || !selectedCity
            || !username || !password || !firstname || !lastname || !errorEmail) {
            const alert = {
                styleClass: ALERT_ERROR,
                description: REGISTER_ERROR,
            };
            setAlert(alert);
        } else {
            const successRegister = 'Congratulations! you have been registered succesfully';
            const alert = {};

            axios({
                url: `${ENDPOINT}/registerUser`,
                method: 'post',
                data: {
                    username,
                    password,
                    name: firstname,
                    lastname,
                    country: selectedCountry,
                    state: selectedState,
                    city: selectedCity,
                },
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.userRegistered) {
                        alert.styleClass = ALERT_SUCCESS;
                        alert.description = successRegister;
                        setAlert(alert);
                        history.push('/login');
                    } else {
                        alert.styleClass = ALERT_ERROR;
                        alert.description = UNEXPECTED_ERROR;
                        setAlert(alert);
                    }
                }).catch((e) => {
                    alert.styleClass = ALERT_ERROR;
                    alert.description = e.response.data.error;
                    setAlert(alert);
                });
        }
    }

    render() {
        const {
            countries,
            states,
            cities,
            errorEmail,
        } = this.state;

        const { clearAlert } = this.props;

        return (
            <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 form_container">
                <div className="left_logo">
                    <img
                        alt=""
                        className="logo_register"
                        src="https://git.patxipierce.com/avatars/9f7dc601d67af6d4b291a05629afc20a"
                    />
                    <h5 className="register_title">
                        {`Register here and help us to have the
                        biggest database of ducks feeding in the world!`}
                    </h5>
                    <br />
                    <br />
                </div>
                <form className="form-row">
                    <div className="form-group col-md-6 vertical_space">
                        <input
                            type="email"
                            name="username"
                            onChange={(e) => {
                                this.setState({
                                    username: e.target.value,
                                    errorEmail: '',
                                });
                                clearAlert();
                            }}
                            className="form-control"
                            placeholder="Enter email"
                        />
                        <Error error={errorEmail} />
                    </div>
                    <div className="form-group col-md-6 vertical_space">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => {
                                this.setState({ password: e.target.value });
                                clearAlert();
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 vertical_space">
                        <input
                            type="text"
                            name="firstname"
                            className="form-control"
                            placeholder="Enter first name"
                            onChange={(e) => {
                                this.setState({ firstname: e.target.value });
                                clearAlert();
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 vertical_space">
                        <input
                            type="text"
                            name="lastname"
                            className="form-control"
                            placeholder="Enter last name"
                            onChange={(e) => {
                                this.setState({ lastname: e.target.value });
                                clearAlert();
                            }}
                        />
                    </div>
                    <div className="form-group col-md-4 col-sm-12 vertical_space">
                        <select className="form-control" onChange={this.getStates}>
                            <option>
                                Select Country
                            </option>
                            {
                                countries.map(country => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-4 col-sm-12 vertical_space">
                        <select className="form-control" onChange={this.getCities}>
                            <option>
                                Select State
                            </option>
                            {
                                states.map(state => (
                                    <option key={state.region} value={state.region}>
                                        {state.region}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-4 col-sm-12 vertical_space">
                        <select
                            className="form-control"
                            onChange={(e) => {
                                this.setState({ selectedCity: e.target.value });
                            }}
                        >
                            <option>
                                Select City
                            </option>
                            {
                                cities.map(city => (
                                    <option key={city.latitude} value={city.city}>
                                        {city.city}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <button type="submit" className="btn btn-primary btn-lg btn-block vertical_space" onClick={this.doRegister}>
                            Register
                        </button>
                        <Link className="btn btn-outline-primary btn-block" to="/login">
                            I am already registered
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    toggleLoading: PropTypes.func,
    setAlert: PropTypes.func,
    clearAlert: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(loadingActions.toggleLoading()),
    setAlert: alert => dispatch(alertActions.setAlert(alert)),
    clearAlert: () => dispatch(alertActions.clearAlert()),
});

export default connect(null, mapDispatchToProps)(Register);
