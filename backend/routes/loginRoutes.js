const express = require('express');

const router = express.Router();
const { loginUser, logoutUser, isLoggedIn } = require('../controllers/loginController');

router.post('/loginUser', loginUser);
router.get('/logoutUser', logoutUser);
router.get('/isLoggedIn', isLoggedIn);

module.exports = router;
