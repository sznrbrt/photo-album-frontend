'use strict';

var express = require('express');
var router = express.Router();


var Img = require('../models/img');

router.get('/', (req, res) => {
  Img.getAll((err, imgs) => {
    res.status(err ? 400 : 200).send(err || imgs);
  })
});

router.get('/:id', (req, res) => {
  Img.getOneById(req.params.id, (err, img) => {
    res.status(err ? 400 : 200).send(err || img);
  })
});

router.post('/', (req, res) => {
  Img.createOne(req.body, (err, img) => {
    res.status(err ? 400 : 200).send(err || img);
  })
});

router.delete('/:imgId', (req, res) => {
  Img.deleteOneById(req.params.imgId, (err) => {
    res.status(err ? 400 : 200).send(err || 'You have deleted one image!');
  })
});

router.put('/:imgId', (req, res) => {
  Img.editOneById(req.params.imgId, req.body, (err, newImgObj) => {
    res.status(err ? 400 : 200).send(err || newImgObj);
  })
});

module.exports = router;
