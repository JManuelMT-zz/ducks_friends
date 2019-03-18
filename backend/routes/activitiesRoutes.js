const express = require('express');

const router = express.Router();
const { getActivitiesValidator } = require('../controllers/activitiesController');

router.get('/getFeedingDucksActivities/:id?', getActivitiesValidator);

module.exports = router;
