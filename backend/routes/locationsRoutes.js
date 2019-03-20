const express = require('express');

const router = express.Router();
const { getCountries, getStates, getCities } = require('../controllers/locationsController');

router.get('/getCountries', getCountries);
router.get('/getStates/:countryCode', getStates);
router.get('/getCities/:countryCode/:region', getCities);

module.exports = router;
