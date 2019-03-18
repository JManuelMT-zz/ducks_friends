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
            return bcrypt.compare(password, response.password).then((passResponse) => {
                if (!passResponse) {
                    return res.status(400).send({ message: appErrors.INVALID_PASSWORD });
                }
                req.session.userId = response._id;
                req.session.username = response.username;
                req.session.name = response.name;
                return res.send({ loginSuccesful: true });
            }).catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
        })
        .catch(() => res.status(500).send({ error: appErrors.UNEXPECTED_ERROR }));
};

exports.logoutUser = (req, res) => req.session.destroy(() => res.send({ logoutSuccessful: true }));
