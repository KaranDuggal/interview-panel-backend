/*global badRequestErr*/
const { DbService, AdminValidator, TokenService, MailService } = require('../../services');
const { UserModel } = require('../../models');
const bcryptjs = require('bcryptjs')
const cmsMessages = require('../../db/messages/cms.messages');
const { env } = require('../../db/constant');

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
    forgotPassword: async (req, res, next) => {
        try {
            let { value, error } = AdminValidator.forgotPassword(req.body);
            if (error) throw error;
            let data = await DbService.findOne(UserModel, {email:value.email,role:1})
            if(data == null) throw badRequestErr(cmsMessages.USER_NOT_EXIST)
            const forgotPasswordToken =await TokenService.create({_id: data._id},{})
            await DbService.update(UserModel,{_id: data._id},{forgotPasswordToken})
            const htmlTemplate = `To set password <a href="${env.FRONTEND_BASE_URL}auth/forgot-password/${forgotPasswordToken}">Click here</a>`
            await MailService.send(data.email,'Forgot password mail',htmlTemplate);
            return res.status(200).json({ success: true, message: cmsMessages.AUTH_FORGET_PASSWORD, data: data, forgotPasswordToken });
        } catch (err) {
            next(err)
        }
    },
    setPassword: async (req, res, next) => {
        try {
            let { value, error } = AdminValidator.setPassword(req.body);
            if (error) throw error;
            let tokenData =await TokenService.decodedToken(value.token)
            let data = await DbService.findById(UserModel, tokenData._id)
            if(data == null) throw badRequestErr(cmsMessages.USER_NOT_EXIST)
            if(data.forgotPasswordToken !== value.token) throw badRequestErr(cmsMessages.AUTH_INVALID_TOKEN)
            await DbService.update(UserModel,{_id:data._id},{password:await bcryptjs.hash(value.password,10),forgotPasswordToken:''})
            return res.status(200).json({ success: true, message: cmsMessages.AUTH_PASSWORD_SET, data: 1, });
        } catch (err) {
            next(err)
        }
    },
}

