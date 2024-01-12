// validationRules.js

const {body, query} = require('express-validator');

const downloadListValidationRules = () => {
    return [
        body('id').isString().withMessage('id must be a string').notEmpty().withMessage('id cannot be empty'),
        body('path').isArray().withMessage('path must be an array')
            .custom((pathArray) => pathArray.length <= 3).withMessage('path must not contain more than 3 items'),
        body('path.*').isString().withMessage('Each item in path must be a string')
    ];
};

const searchParamsValidationRules = () => {
    return [
        query('shareCode').isString().withMessage('shareCode must be a string').notEmpty().withMessage('shareCode cannot be empty')
    ];
};

module.exports = {
    downloadListValidationRules,
    searchParamsValidationRules
};
