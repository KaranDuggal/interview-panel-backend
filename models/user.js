/*global mongoose*/
const bcryptjs = require('bcryptjs');
const {statuses,roles} = require('../db/constant')
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        trim:true,
        required: true,
    },
    lastName: {
        type:String,
        trim:true,
    },
    email: {
        type:String,
        trim:true,
        unique:true,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    DOB: {
        type:String,
    },
    gender: {
        type:String,
    },
    role: {
        type:Number,
        enum:roles,
        default:2,
    },
    forgotPasswordToken: {
        type:String,
    },
    status: {
        type:Number,
        enum:statuses,
        default:1, 
    },
})
userSchema.pre('save', async function (next) {
    this.password = await bcryptjs.hash(this.password,10)
    console.log('this', this)
    next()
})

userSchema.pre('update', async function (next) {
    this.password = await bcryptjs.hash(this.password,10)
    console.log('-----------------------------------------------', this)
    next()
})
module.exports = mongoose.model('user', userSchema);

