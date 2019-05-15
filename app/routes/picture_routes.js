const express = require('express')

const passport = require('passport')
const bodyParser = require('body-parser')
const s3UploadFile = require('../../lib/s3PictureApi')
const Picture = require('../models/picture')
const multer = require('multer')
const removeBlanks = require('../../lib/remove_blank_fields')
const customErrors = require('../../lib/custom_errors')
const AWS = require('aws-sdk')
const requireToken = passport.authenticate('bearer', { session: false })
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// From example Route ^^^^^

const multerUpload = multer({ dest: 'pictures/' })
require('dotenv').config()
const s3 = new AWS.S3()

const router = express.Router()

// CREATE (POST)
// as Extra to class, added require Token
router.post('/pictures', requireToken, multerUpload.single('picture'), (req, res, next) => {
  console.log('################################')
  // req.body.picture.owner = req.user.id
  console.log('################################')
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
      // req.body.picture.owner = req.user.id
      return Picture.create({owner: req.user.id, url: s3Response.Location, title: req.file.originalname})
    })
    .then(uploadDocument => {
      // The object we are passing through the browser.
      res.status(201).json({ picture: uploadDocument.toObject() })
    })
    .catch(next)
})

// INDEX (GET)
router.get('/pictures', (req, res, next) => {
  Picture.find()
    .populate('owner')
    .then(pictures => {
      return pictures.map(picture => picture.toObject())
    })
    .then(pictures => {
      res.json({pictures})
    })
    .catch(next)
})

// SHOW (GET)
router.get('/pictures/:id', (req, res, next) => {
  Picture.findById(req.params.id)
    .populate('owner')
    .then(handle404)
    .then(picture => {
      res.status(200).json({picture: picture.toObject()})
    })
    .catch(next)
})

// UPDATE(PATCH)
router.patch('/pictures/:id', requireToken, removeBlanks,
  (req, res, next) => {
    delete req.body.picture.owner

    Picture.findById(req.params.id)
      .then(handle404)
      .then(picture => {
        requireOwnership(req, picture)

        return picture.update(req.body.picture)
      })
      .then(() => res.sendStatus(204))
      .catch(next)
  })

// DESTROY(DELETE)
router.delete('/pictures/:id', requireToken, (req, res, next) => {
  Picture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      requireOwnership(req, picture)
      picture.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
