const express = require('express');

const router = express.Router();
const { registerUser, registerFeedingActivity } = require('../controllers/registerController');

router.post('/registerUser', registerUser);
router.post('/registerDucksFeeding', registerFeedingActivity);

module.exports = router;
