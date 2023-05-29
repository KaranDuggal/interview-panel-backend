/*global mongoose __dirname publicDirPath*/
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const colors = require('colors')
const { env } = require('./db/constant');
const fs = require('fs');
global.mongoose = require('mongoose');
global.ObjectId = mongoose.Types.ObjectId;
global.badRequestErr = (msg)=>{
    return {
        status:400,
        message:msg
    }
};
global.jsonLog = (data)=>{ console.log('JSON-LOG -->',colors.green(JSON.stringify(data,null,5))) };
global.publicDirPath = path.join(__dirname,'./public/')
require('./db/config').configure(mongoose);

const app = express();
console.log(' ---------------------------------- ENV ---------------------------------- ')
console.log(env)
console.log(' ------------------------------------------------------------------------- ') 
if(env.Logs === 'true'){
    // eslint-disable-next-line no-unused-vars
    logger.token('body', (req,res) => JSON.stringify(req.body, 0, 2));
    app.use(logger(colors.green(':method '+colors.yellow(':url')+' :status :response-time ms - :res[content-length] ' +colors.blue(':body')+' - :req[content-length]')));
}

const cmsPath = './dist/tattoo-admin/';
app.use(express.static(path.join(__dirname, cmsPath)));
app.use(/^((?!(api|images)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, cmsPath + 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/api/admin', require('./routes/admin/index'));
app.use('/api/common', require('./routes/common/index'));

var isImgDirExist = path.join(__dirname,'./public/images');
if (!fs.existsSync(isImgDirExist)){
    fs.mkdirSync(isImgDirExist);
}

/**Error handler */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res,next) => {
    console.log(' ------------------------------- ERROR ------------------------------- ');
    if(req.file && req.file) fs.unlinkSync(publicDirPath+req.file.path);
    if(req.files && req.files.length > 0){
        req.files.forEach(file => {
            if(fs.existsSync(publicDirPath+file.path)) fs.unlinkSync(publicDirPath+file.path);
        });
    }
    console.log('err:', colors.red(err))
    /**Mongoose duplicate key error */
    if (err.code == 11000) {
        err.message = env.ALREADY_EXIST
        err.status = 400
        let { keyValue, } = err;
        let size = Object.keys(keyValue).length;
        let count = 1;
        err.message = 'Duplicate value'
        for (const key in keyValue) {
            err.message += ` ${keyValue[key]}`;
            (count === size) ? '' : err.message += ',';
            count++;
        }
        err.message += ' in'
        count = 1;
        for (const key in keyValue) {
            err.message += ' ' + key;
            (count === size) ? err.message += '.' : err.message += ','
            count++;
        }
    }
    if(err.code === 'LIMIT_UNEXPECTED_FILE') err.message = 'Image uploading limit exceeded'
    return res.status(err.status || 500).json({ message: err.message || 'Unexpected error occurred!', error: err })
})

module.exports = app;
