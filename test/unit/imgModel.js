'use strict';

var expect = require('chai').expect;

var Img = require('../../models/img');

var mongoose = require('mongoose');
var MONGOURL = 'mongodb://localhost/testing';

var testImgId = null;

before(function(cb) {
  mongoose.connection.close(function() {
    mongoose.connect(MONGOURL, cb);
  });
});

after(function(cb) {
  mongoose.connection.close(cb);
});

beforeEach(function(cb) {
  Img.remove({}, (err) => {
    if(err) return cb(err);
    var img = new Img({
      imageUrl: "www.imgurl.com"
    });
    img.save((err, dbImg) => {
      testImgId = img._id;
      cb();
    })
  })
})

describe('Img', function() {

  describe('.getAll()', function() {
    it('should retrive all images from the db', function(cb) {
      Img.getAll((err, imgs) => {
        if(err) console.log(err);
        expect(err).to.not.exist;
        expect(imgs).to.exist;
        cb();
      })
    })
  })



  describe('.getOneById()', function() {
    it('should retrive one image from the db by ID', function(cb) {
      var imgId = testImgId;
      Img.getOneById(imgId, (err, img) => {
        if(err) console.log(err);
        expect(err).to.not.exist;
        expect(img).to.exist;
        cb();
      })
    })
  })

  describe('.createOne()', function() {
    it('should create a new one and retrive it from the db', function(cb) {
      var imgObj = { imageUrl: "www.nicepic.com"};
      Img.createOne(imgObj, (err, img) => {
        expect(err).to.not.exist;
        expect(img).to.exist;
        Img.getAll((err, imgs) => {
          expect(err).to.not.exist;
          expect(imgs).to.have.length.of.at.least(2);
          cb();
        })
      })
    })
  })

})
