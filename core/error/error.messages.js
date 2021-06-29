module.exports = {
    // BAD REQUEST

    BAD_REQUEST: {
        customCode: 4000
    },
    TOO_WEAK_PASSWORD: {
        customCode: 4001
    },

    ID_NOT_VALID: {
        customCode: 4002
    },
    BODY_NOT_VALID: {
        customCode: 4005
    },
    USER_NOT_ACTIVATE: {
        customCode: 4009
    },

    WRONG_EMAIL_OF_PASSWORD: {
        customCode: 4003
    },

    NO_TOKEN: {
        customCode: 4004
    },
    USER_ALREADY_EXISTS: {
        customCode: 4006,
        message: 'User with such email already exists'
    },
    // UNAUTHORIZED
    WRONG_TOKEN: {
        customCode: 4011
    },
    // NOT FOUND
    RECORD_NOT_FOUND: {
        customCode: 4041
    },
    USER_NOT_FOUND: {
        customCode: 4042
    },
};
