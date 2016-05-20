'use strict';

var expect = require('chai').expect;

var Album = require('../../models/album');

var mongoose = require('mongoose');
var MONGOURL = 'mongodb://localhost/testing';

var testAlbumId = null;

before(function(cb) {
  mongoose.connection.close(function() {
    mongoose.connect(MONGOURL, cb);
  });
});

after(function(cb) {
  mongoose.connection.close(cb);
});

beforeEach(function(cb) {
  Album.remove({}, (err) => {
    var album = new Album({
      name: "testalbum",
      images: ['573d13b2e3a96679151515ca']
    });
    album.save((err, dbAlbum) => {
      testAlbumId = dbAlbum._id;
      cb()
    })
  })
})

describe('Album', function() {

  describe('.getAll()', function() {
    it('should retrive all albums from the db', function(cb) {
      Album.getAll((err, albums) => {
        expect(err).to.not.exist;
        expect(albums).to.exist;
        cb();
      })
    })
  })

  describe('.getOneById()', function() {
    it('should retrive one album from the db by ID', function(cb) {
      var albumId = testAlbumId;
      Album.getOneById(albumId, (err, album) => {
        expect(err).to.not.exist;
        expect(album).to.exist;
        cb();
      })
    })
  })

  describe('.createOne()', function() {
    it('should create a new one and retrive it from the db', function(cb) {
      var albumObj = {name: "TestAlbum"};
      Album.createOne(albumObj, (err, album) => {
        expect(err).to.not.exist;
        expect(album).to.exist;
        Album.getAll((err, albums) => {
          expect(err).to.not.exist;
          expect(albums).to.have.length.of.at.least(2);
          cb();
        })
      })
    })
  })

  describe('.deleteOneById()', function() {
    it('should delete an album based on its Id', function(cb) {
      var albumId = testAlbumId;
      Album.deleteOneById(albumId, (err) => {
        expect(err).to.not.exist;
        Album.getAll((err, albums) => {
          expect(err).to.not.exist;
          expect(albums).to.exist;
          expect(albums).to.have.length(0);
          cb();
        })
      })
    })
  })

  describe('.addImgToAlbum()', function() {
    it('should add a new photo to the album', function(cb) {
      var albumId = testAlbumId;
      var imgId = '573d13b2e3a96679158915ca';
      Album.addImgToAlbum(albumId, imgId, (err) => {
        expect(err).to.not.exist;
        Album.getOneById(albumId, (err, album) => {
          expect(err).to.not.exist;
          expect(album).to.exist;
          expect(album.images).to.have.length.of.at.least(2);
          cb();
        })
      })
    })
  })

  describe('.removeImgFromAlbumById()', function() {
    it('should remove a photo from the album by id', function(cb) {
      var albumId = testAlbumId;
      var imgId = '573d13b2e3a96679158915ca';
      Album.removeImgFromAlbumById(albumId, imgId, (err) => {
        expect(err).to.not.exist;
        Album.getOneById(albumId, (err, album) => {
          expect(err).to.not.exist;
          expect(album).to.exist;
          expect(album.images).to.have.length(0);
          cb();
        })
      })
    })
  })

  describe('.editOneById()', function() {
    it('should edit an album found by it\'t id and return the new album', function(cb) {
      var albumId = testAlbumId;
      var newAlbumObj = {name: "editedTestAlbum"};
      Album.editOneById(albumId, newAlbumObj,(err, newAlbum) => {
        expect(err).to.not.exist;
        Album.getOneById(albumId, (err, album) => {
          expect(err).to.not.exist;
          expect(album).to.exist;
          expect(album.name).to.equal('editedTestAlbum');
          cb();
        })
      })
    })
  })
})
