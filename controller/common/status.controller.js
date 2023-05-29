const { DbService,CommonValidator } = require('../../services');
const commonMessages = require('../../db/messages/common.messages ');

module.exports = {
    status: async (req, res, next) => {
        try {
            let { value, error } = CommonValidator.status(req.body);
            if (error) throw error;
            const model = require(`../../models/${value.modelName}`)
            await DbService.update(model,{ _id:value._id },{status:value.status})
            return res.status(200).json({ success: true, message: commonMessages.STATUS_UPDATE_SUCCESSFULLY, data: 1 });
        } catch (err) {
            next(err)
        }
    },
}

