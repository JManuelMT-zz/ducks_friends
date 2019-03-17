const User = require('../models/user');
const handleError = require('../../utils/handlerError');

exports.registerUser = (req, res) => {
    const {
        username,
        password,
        name,
        lastname,
        country,
        state,
        city,
    } = req.body;

    const user = new User({
        username,
        password,
        name,
        lastname,
        country,
        state,
        city,
    });

    user.save()
        .then(() => res.send({ userRegistered: true }))
        .catch(error => res.status(500).send({ error: handleError(error.code) }));
};
