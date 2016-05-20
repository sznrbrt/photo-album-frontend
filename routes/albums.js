'use strict';

var express = require('express');
var router = express.Router();


var Album = require('../models/album');
var Img = require('../models/img');

router.get('/', (req, res) => {
  Album.getAll((err, albums) => {
    res.status(err ? 400 : 200).send(err || albums);
  });
});

router.get('/:id', (req, res) => {
  Album.getOneById(req.params.id, (err, album) => {
    res.status(err ? 400 : 200).send(err || album);
  })
});

router.post('/', (req, res) => {
  Album.createOne(req.body, (err, album) => {
    res.status(err ? 400 : 200).send(err || album);
  })
});

router.put('/:albumId/addToAlbum/:imgId', (req, res) => {
    Img.recordToAlbum(req.params.imgId, req.params.albumId, (err2)=> {
      Album.addImgToAlbum(req.params.albumId, req.params.imgId, (err3) => {
        res.status(err2 || err3 ? 400 : 200).send(err2 || err3 || 'Image added to the album!');
      })
    })
});

router.delete('/:albumId/removeFromAlbum/:imgId', (req, res) => {
  Img.removeFromAlbum(req.params.imgId, req.params.albumId, (err1) => {
    Album.removeImgFromAlbumById(req.params.albumId, req.params.imgId, (err2) => {
      res.status(err1 || err2 ? 400 : 200).send(err1 || err2 || 'Image removed from the album!');
    })
  })
});

router.put('/:albumId', (req, res) => {
  Album.editOneById(req.params.albumId, req.body, (err, newAlbumObj) => {
    res.status(err ? 400 : 200).send(err || newAlbumObj);
  })
});

router.delete('/:albumId', (req, res) => {
  Album.deleteOneById(req.params.albumId, (err) => {
    res.status(err ? 400 : 200).send(err || 'You have deleted one album!');
  })
});

module.exports = router;
