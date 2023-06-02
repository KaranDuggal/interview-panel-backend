/*global process*/
require('dotenv-flow').config();

let env = {
    //ENV File
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    SEND_GRID_EMAIL_ID: process.env.SEND_GRID_EMAIL_ID,
    SEND_GRID_EMAIL_PASS: process.env.SEND_GRID_EMAIL_PASS,
    SEND_GRID_KEY: process.env.SEND_GRID_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    FRONTEND_BASE_URL:process.env.FRONTEND_BASE_URL,
    Logs:process.env.Logs,
    isAtlasUse:process.env.isAtlasUse,
    ALREADY_EXIST:'Already Exist'
}
const statuses = [1,2,3] // ["Pending","Rejected","Verified"]
const roles = [1,2] // ["admin","user"]
const models = ['tag','product']
module.exports = {env,statuses,roles,models};
// module.exports = status;