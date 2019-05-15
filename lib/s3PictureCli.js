require('dotenv').config()
const AWS = require('aws-sdk')
const mime = require('mime-types')
const fs = require('fs')
const mimeType = mime.lookup(process.argv[2])
const s3 = new AWS.S3()

const extension = mime.extension(mimeType)
const promiseReadFile = function () {
  return new Promise((resolve,reject) => {
    fs.readFile(process.argv[2], (err,data) => {
      if(err) {
        reject(err)
      }
      else{
        resolve(data)
      }
    })
  })
}

promiseReadFile()
  .then( (fileData) => ({
    Key:`${Date.now()}.${extension}`,
    Bucket:process.env.BUCKET_NAME ,
    // Bucket:'st-third' ,
    Body: fileData,
    // ContentType: 'image/jpeg',
    ContentType: mimeType,
    ACL:'public-read'
  }) )
  .then(params => {
    s3.upload(params,function(err,data) {
      if(err) {
        console.log(err)
        return
      }
      console.log(data)
    })
  })
  .catch(console.log())
