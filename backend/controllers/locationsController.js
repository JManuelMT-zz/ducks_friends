const axios = require('axios');
const appErrors = require('../../constants/appErrors');
const { COUNTRIES_API_KEY, COUNTRIES_API_URL } = require('../../constants/countriesApi');

exports.getCountries = (req, res) => {
    axios.get(`${COUNTRIES_API_URL}/country/all/?&key=${COUNTRIES_API_KEY}`)
        .then(response => res.send(response.data))
        .catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
};

exports.getStates = (req, res) => {
    axios.get(`${COUNTRIES_API_URL}/region/${req.params.countryCode}/all/?&key=${COUNTRIES_API_KEY}`)
        .then(response => res.send(response.data))
        .catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
};

exports.getCities = (req, res) => {
    axios.get(`${COUNTRIES_API_URL}/city/${req.params.countryCode}/search/?region=${req.params.region}&key=${COUNTRIES_API_KEY}`)
        .then(response => res.send(response.data))
        .catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
};
