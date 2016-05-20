'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;
let app = require('../../app');

var Album = require('../../models/album');

var testAlbumId = null;

beforeEach(function(cb) {
  Album.remove({}, (err) => {
    var album = new Album({
      name: "testalbum",
      images: ['573d13b2e3a96679151515ca']
    });
    album.save((err, dbAlbum) => {
      if(err) console.log(err);
      testAlbumId = album._id;
      cb()
    })
  })
})

describe('/api/albums', () => {

  describe('GET /', () => {
    it('should respond with the array of all albums', (cb) => {
      supertest(app)
        .get('/api/albums')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0].name).to.equal('testalbum');
          cb()
        });
    });
  })

  describe('GET /:id', () => {
    it('should respond with an album by ID', (cb) => {
      supertest(app)
        .get(`/api/albums/${testAlbumId}` )
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          cb()
        });
    });
  })

  describe('POST /', () => {
    it('should respond with an album by ID', (cb) => {
      supertest(app)
        .post('/api/albums/')
        .send({
          'name': 'OtherTestAlbum',
        })
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('OtherTestAlbum');
          cb()
        });
    });
  })

  // describe('PUT /', () => {
  //   it('should add an imageId to the album\'s images', (cb) => {
  //     supertest(app)
  //       .put(`/api/albums/${testAlbumId}/addToAlbum/573d13b2e3c94479151515ca`)
  //       .end((err, res) => {
  //         console.log(err);
  //         expect(err).to.not.exist;
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body).to.equal('Image added to the album!');
  //         cb()
  //       });
  //   });
  // })
})
