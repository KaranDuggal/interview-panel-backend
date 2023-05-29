/*global badRequestErr*/
const { DbService, AdminValidator, TokenService } = require('../../services');
const { UserModel } = require('../../models');
const bcryptjs = require('bcryptjs')
const cmsMessages = require('../../db/messages/cms.messages');

module.exports = {
    signup: async (req, res, next) => {
        try {
            let { value, error } = AdminValidator.signUp(req.body);
            if (error) throw error;
            value.status = 1
            return res.status(200).json({ success: true, message: cmsMessages.ADD, data: await DbService.create(UserModel, value) });
        } catch (err) {
            next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            let { value, error } = AdminValidator.logIn(req.body);
            if (error) throw error;
            let data = await DbService.findOne(UserModel, {email:value.email,role:1})
            if(data == null) throw badRequestErr(cmsMessages.USER_NOT_EXIST)
            // switch (data.status) {
            //     case 1:
            //         throw badRequestErr(cmsMessages.USER_NOT_VERIFY)
            //     case 2:
            //         throw badRequestErr(cmsMessages.USER_REJECTED)
            // }
            if(!await bcryptjs.compare(value.password,data.password)) throw badRequestErr(cmsMessages.INVALID_CREDENTIALS)
            await TokenService.create({_id: data._id},{})
            data = JSON.parse(JSON.stringify(data))
            delete data.password
            return res.status(200).json({ success: true, message: cmsMessages.AUTH_LOGIN, data: data, token: await TokenService.create({_id: data._id},{}) });
        } catch (err) {
            next(err)
        }
    },
}

