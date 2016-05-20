'use strict';

var app = angular.module('photoalbumApp');

app.service('Image', function($http) {

  this.getAll = () => {
    return $http.get('./api/imgs');
  }

  this.new = (imgObj) => {
    return $http.post('./api/imgs', imgObj);
  }

  this.editOne = (id, imgObj) => {
    return $http.put('./api/imgs/' + id, imgObj);
  }

  this.delete = (id) => {
    return $http.delete('./api/imgs/' + id);
  }

  this.getOne = (id) => {
    return $http.get('./api/imgs/' + id);
  }
})

app.service('Album', function($http) {
  this.getAll = () => {
    return $http.get('./api/albums');
  }

  this.create = (albumObj) => {
    return $http.post('./api/albums', albumObj);
  }

  this.getOne = (id) => {
    return $http.get('./api/albums/' + id);
  }

  this.removeImgFromAlbumById = (albumId, imgId) => {
    return $http.delete(`./api/albums/${albumId}/removeFromAlbum/${imgId}`);
  }
  this.addImgToAlbumById = (albumId, imgId) => {
    return $http.put(`./api/albums/${albumId}/addToAlbum/${imgId}`);
  }

  this.deleteOne = (id) => {
    return $http.delete(`./api/albums/${id}`);
  }

})

app.service('StoreData', function() {
  var storeData = {};
  this.get = () => { return storeData }
  this.set = (data) => { storeData = data }
})
