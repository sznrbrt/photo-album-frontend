'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var imgSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true},
  createdAt: { type: String },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  title: { type: String }
});

imgSchema.statics.getAll = function(cb){
  Img.find({}, (err, imgs) => {
    cb(err, imgs)
  })
}

imgSchema.statics.getOneById = function(imgId, cb){
  Img.findById(imgId, (err, img) => {
    cb(err, img);
  }).populate('albums');
}

imgSchema.statics.createOne = function(imgObj, cb){
  imgObj.createdAt = new Date();
  var img = new Img(imgObj);
  img.save(cb);
}

imgSchema.statics.deleteOneById = function(imgId, cb){
  Img.findByIdAndRemove(imgId, cb);
}

imgSchema.statics.editOneById = function(imgId, newImgObj, cb) {
  Img.findByIdAndUpdate(imgId, { $set: newImgObj }, {new: true}, cb);
}

imgSchema.statics.recordToAlbum = function(imgId, albumId, cb) {
  Img.findById(imgId, (err1, img) => {
    if(img.albums.indexOf(albumId) === -1) {
      img.albums.push(albumId);
    }
    img.save((err2) => {
      cb(err1 || err2);
    })
  })
}

imgSchema.statics.removeFromAlbum = function(imgId, albumId, cb) {
  Img.findById(imgId, (err1, img) => {
    var idx = img.albums.indexOf(albumId.toString());
    img.albums.splice(idx, 1);
    img.save((err2) => {
      cb(err1 || err2);
    })
  })
}


var Img = mongoose.model('Img', imgSchema);

module.exports = Img;
