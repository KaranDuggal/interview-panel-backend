const Joi = require('joi')/* .extend(require('@joi/date')) */;
Joi.objectId = require('joi-objectid')(Joi);
// const { statuses } = require('../../db/constant');

module.exports = {
    signUp: (data) => {
        return Joi.object({
            firstName: Joi.string().min(3).max(30).trim().required(),
            lastName: Joi.string().trim().allow('', null),
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(6).max(30).required(),
            role: Joi.number().valid(1).required(),
        }).validate(data);
    },
    logIn: (data) => {
        return Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(6).max(30).required(),
            role: Joi.number().valid(1).required(),
        }).validate(data);
    },
    forgotPassword: (data) => {
        return Joi.object({
            email: Joi.string().trim().email().required(),
        }).validate(data);
    },
    setPassword: (data) => {
        return Joi.object({
            token: Joi.string().required(),
            password: Joi.string().min(6).max(30).required(),
        }).validate(data);
    },
}

