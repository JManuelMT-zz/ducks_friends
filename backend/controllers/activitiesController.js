const User = require('../models/user');
const appErrors = require('../../constants/appErrors');

const getAllFeedingDucksActivities = (req, res) => {
    // this is to validate if there is a session
    const { userId } = req.session;
    if (userId) {
        return User.find({}).select('country state city ducks_feeding').exec()
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
    }
    return res.status(403).send({ message: appErrors.FORBIDDEN_ACCESS });
};

const getUserFeedingDucksActivities = (req, res) => {
    // this is to validate if there is a session
    const { userId } = req.session;
    if (userId) {
        const { id } = req.params;
        return User.findById(id).select('country state city ducks_feeding').exec()
            .then((response) => {
                const duckFeedingActivities = response.ducks_feeding.length > 0;
                if (duckFeedingActivities) {
                    return res.send(response);
                }
                return res.status(404).send({ message: appErrors.EMPTY_ACTIVITIES });
            })
            .catch(() => res.status(500).send({ error: appErrors.EMPTY_ACTIVITIES }));
    }
    return res.status(403).send({ message: appErrors.FORBIDDEN_ACCESS });
};

exports.getActivitiesValidator = (req, res) => {
    const { id } = req.params;
    if (!id) {
        getAllFeedingDucksActivities(req, res);
    } else {
        getUserFeedingDucksActivities(req, res);
    }
};
