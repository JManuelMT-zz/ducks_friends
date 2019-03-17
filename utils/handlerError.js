const errorCodes = require('../constants/errorCodes');
const { UNEXPECTED_ERROR } = require('../constants/appErrors');

module.exports = (errorCode) => {
    switch (errorCode) {
        case errorCodes.DUPLICATE_KEY.code:
            return errorCodes.DUPLICATE_KEY.description;
        case errorCodes.INTERRUPTED.code:
            return errorCodes.INTERRUPTED.description;
        case errorCodes.KEY_TOO_LONG.code:
            return errorCodes.KEY_TOO_LONG.description;
        case errorCodes.OUT_OFF_DISK_SPACE.code:
            return errorCodes.OUT_OFF_DISK_SPACE.description;
        default:
            return UNEXPECTED_ERROR;
    }
}