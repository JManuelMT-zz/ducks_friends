const User = require('../models/user');
const appErrors = require('../../constants/appErrors');

const getAllFeedingDucksActivities = (req, res) => {
    User.find({}).select('country state city ducks_feeding').exec()
        .then((response) => {
            const duckFeedingActivities = response.filter(
                activity => activity.ducks_feeding.length > 0,
            );
            if (duckFeedingActivities.length > 0) {
                return res.send(duckFeedingActivities);
            }
            return res.status(404).send({ message: appErrors.EMPTY_ACTIVITIES });
        })
        .catch(() => res.status(500).send({ error: appErrors.EMPTY_ACTIVITIES }));
};

const getUserFeedingDucksActivities = (req, res) => {
    const { id } = req.params;
    return User.findById(id).select('country state city ducks_feeding').exec()
        .then((response) => {
            const duckFeedingActivities = response.ducks_feeding.length > 0;
            if (duckFeedingActivities) {
                return res.send([response]);
            }
            return res.status(404).send({ message: appErrors.EMPTY_ACTIVITIES });
        })
        .catch(() => res.status(500).send({ error: appErrors.EMPTY_ACTIVITIES }));
};

exports.getActivitiesValidator = (req, res) => {
    const { id } = req.params;
    if (!id) {
        getAllFeedingDucksActivities(req, res);
    } else {
        getUserFeedingDucksActivities(req, res);
    }
};
