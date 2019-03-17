const express = require('express');

const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/loginController');

router.post('/loginUser', loginUser);
router.get('/logoutUser', logoutUser);

module.exports = router;
