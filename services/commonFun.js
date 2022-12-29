// const AwsService = require('./aws.services');
module.exports = {
    // pagination : (pageNo,limit) => {
    //     limit =  parseInt(limit);
    //     pageNo = pageNo ? + limit * (parseInt(pageNo) - 1) : 0;
    //     return {start:pageNo,limit}
    // },
    // imgUpload : async (fileArray,folderName) => {
    //     let imgs = [];
    //     for (const file of fileArray) {
    //         imgs.push(await AwsService.upload(file,folderName))
    //     }
    //     return imgs;
    // },
    // imgUploadReturnObj : async (file,type,folderName) => {
    //     return {type:type,url:await AwsService.upload(file,folderName)};
    // },
    // removeNullValFromObj : async (body) => {
    //     const fbody = {};
        
    //     for (const field in body) {
    //         if(body[field] != null) fbody[field] = body[field];
    //     }
    //     return fbody
    // },
    strToObj: (body,fieldNames)=>{
        fieldNames.forEach(key => {
            if(body[key] && typeof body[key] === 'string') body[key] = JSON.parse(body[key])
        });
        return body;
    },
    imgsFileObjToArrOfStr(filesArr){
        let arr = [];
        filesArr.forEach(file => {
            arr.push(file.path)
        });
        return arr
    },
    pickQualityNoForImg(fileSize){
        if(fileSize <= 256000) return 90
        else if(fileSize <= 1048576) return 75
        else if(fileSize <= 3145728) return 65
        return 60
    },
}