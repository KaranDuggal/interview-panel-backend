const {DbService,TokenService} = require('../services');
const { UserModel } = require('../models');
module.exports = (...args) => async (req, res, next) => {
    try {
        if (!args.length) { throw 'Invalid Role' }
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = await TokenService.decodedToken(token);
        let user
        switch (args[0]) {
            case 'isUser':
                user = await DbService.findById(UserModel,decodedToken._id)
                if(user && user.isVerified && user.role === 'user'){
                    req.user = JSON.parse(JSON.stringify(user));
                    delete req.user.password, delete req.user.__v;
                    return next();
                }else throw '';
            case 'isAdmin':
                user = await DbService.findById(UserModel,decodedToken._id)
                if(user && user.role === 1 && user.status === 3){
                    req.user = JSON.parse(JSON.stringify(user));
                    delete req.user.password, delete req.user.__v;
                    return next();
                }else throw '';
            default:
                throw '';
        }
    } catch (error) {
        res.status(401).json({
            message: 'Auth Failed'
        })
    }
}