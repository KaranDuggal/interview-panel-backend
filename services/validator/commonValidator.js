const Joi = require('joi')/* .extend(require('@joi/date')) */;
Joi.objectId = require('joi-objectid')(Joi);
const { models } = require('../../db/constant')

module.exports = {
    status: (data) => {
        return Joi.object({
            _id: Joi.objectId().required(),
            status: Joi.boolean().required(),
            modelName: Joi.string().valid(...models).required(),
        }).validate(data);
    },
}

