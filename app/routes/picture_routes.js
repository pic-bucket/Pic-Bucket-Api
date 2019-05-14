const express = require('express')

const s3UploadFile = require('../../lib/s3PictureApi')
const Picture = require('../models/picture')
const multer = require('multer')
const multerUpload = multer({ dest: 'pictures/' })
const AWS = require('aws-sdk')
require('dotenv').config()
const s3 = new AWS.S3()

const router = express.Router()

router.post('/pictures', multerUpload.single('picture'), (req, res, next) => {
  s3UploadFile.promiseReadFile(req.file)
    .then(fileData => ({
      Key: req.file.filename,
      Bucket: process.env.BUCKET_NAME,
      Body: fileData,
      ACL: 'public-read',
      ContentType: req.file.mimetype
    }))
    .then(s3UploadFile.promiseS3Upload)
    .then(s3Response => {
      // this going to Schema of mongoose
      // console.log()
      return Picture.create({ url: s3Response.Location, title: req.file.originalname})
    })
    .then(uploadDocument => {
      // The object we are passing through the browser.
      res.status(201).json({picture: uploadDocument.toObject() })
    })
    .catch(next)

})

module.exports = router
