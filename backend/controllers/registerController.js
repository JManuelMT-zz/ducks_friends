const User = require('../models/user');
const handleError = require('../../utils/handlerError');
const appErrors = require('../../constants/appErrors');

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

exports.registerFeedingActivity = (req, res) => {
    const duckFeedingActivity = {
        date: req.body.date,
        park_name: req.body.parkName,
        food: req.body.food,
        food_quantity: req.body.foodQuantity,
    };
    const { userId } = req.body;
    console.log('lamuerte', userId)
    User.findById(userId).exec()
        .then((user) => {
            user.ducks_feeding.push(duckFeedingActivity);
            user.save()
                .then(() => res.send({ activityRegistered: true }))
                .catch(() => res.status(500).send(
                    { error: handleError(appErrors.UNEXPECTED_ERROR) },
                ));
        })
        .catch(() => res.status(400).send(
            { error: handleError(appErrors.INVALID_ID) },
        ));
};
