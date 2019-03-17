const bcrypt = require('bcrypt');
const User = require('../models/user');
const appErrors = require('../../constants/appErrors');

exports.loginUser = (req, res) => {
    const {
        username,
        password,
    } = req.body;

    User.findOne({ username }).exec()
        .then((response) => {
            if (!response) {
                return res.status(400).send({ error: appErrors.INVALID_EMAIL });
            }
            if (!bcrypt.compareSync(password, response.password)) {
                return res.status(400).send({ message: appErrors.INVALID_PASSWORD });
            }
            return res.send({ loginSuccesful: true });
        })
        .catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
};
