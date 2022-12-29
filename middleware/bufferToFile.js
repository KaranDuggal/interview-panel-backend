/*global badRequestErr publicDirPath*/
const {pickQualityNoForImg} = require('../services/commonFun')
const sharp = require('sharp');
module.exports = () => async (req, res, next) => {
    try {
        if(req.file !== undefined){
            if(req.file.size >= 6291456) throw 'Image size must be less then 6MB'
            let _quality = pickQualityNoForImg(req.file.size)
            let imgPath = `images/${Date.now()}.jpeg`
            await sharp(req.file.buffer).resize({fit:sharp.fit.fill,width:720,height:480}).jpeg({quality:_quality}).toFile(publicDirPath + imgPath);
            req.file.path = imgPath
        }else if(req.files !== undefined){
            if(Array.isArray(req.files)){
                for (const file of req.files) {
                    if(file.size >= 6291456) throw 'Image size must be less then 6MB'
                    let _quality = pickQualityNoForImg(file.size)
                    let imgPath = `images/${Date.now()}.jpeg`
                    await sharp(file.buffer).resize(720).jpeg({quality:_quality}).toFile(publicDirPath + imgPath);
                    file.path = imgPath
                }
            }else{
                console.log('files objects');
            }
        }
        next()
    } catch (err) {
        next(badRequestErr(err))
    }
}