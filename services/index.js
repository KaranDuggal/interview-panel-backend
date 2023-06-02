module.exports = {
    AdminValidator : require('./validator/adminValidator'),
    // UserValidator : require('./validator/userValidator'),
    CommonValidator : require('./validator/commonValidator'),
    DbService : require('./Db.service'),
    CommonAggService : require('./commonAgg.service'),
    TokenService : require('./token.service'),
    CommonFun : require('./commonFun'),
    // AwsService : require('./aws.services'),
    // QrcodeService : require('./qrcode.service'),
    MailService: require('./mail.service')
}