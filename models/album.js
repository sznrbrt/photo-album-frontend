'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Img' }]
});

albumSchema.statics.getAll = function(cb){
  Album.find({}, (err, albums) => {
      cb(err, albums)
  }).populate('images');
}

albumSchema.statics.getOneById = function(albumId, cb){
  Album.findById(albumId, (err, album) => {
    cb(err, album);
  }).populate('images');
}

albumSchema.statics.createOne = function(albumObj, cb){
  var album = new Album(albumObj);
  album.save(cb);
}

albumSchema.statics.deleteOneById = function(albumId, cb){
  Album.findByIdAndRemove(albumId, cb);
}

albumSchema.statics.addImgToAlbum = function(albumId, imgId, cb) {
  Album.findById(albumId, (err, album) => {
    if(album["images"].indexOf(imgId) === -1){
      album["images"].push(imgId);
    }
    album.save((err, album) => {
      cb(err)
    })
  })
}

albumSchema.statics.removeImgFromAlbumById = function(albumId, imgId, cb) {
  Album.findById(albumId, (err, album) => {
    var idx = album.images.indexOf(imgId);
    album.images.splice(idx, 1);
    album.save((err) => {
      cb(err)
    })
  })
}

albumSchema.statics.editOneById = function(albumId, newAlbumObj, cb) {
  Album.findByIdAndUpdate(albumId, { $set: newAlbumObj }, {new: true}, cb);
}

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;
