const { DbService } = require('../../services');
const commonMessages = require('../../db/messages/common.messages ');
const { TagModel } = require('../../models/')

module.exports = {
    get: async (req, res, next) => {
        try {
            return res.status(200).json({ success: true, message: commonMessages.GET_SUCCESSFULLY, data: await DbService.find(TagModel,{status:true}) });
        } catch (err) {
            next(err)
        }
    },
}

