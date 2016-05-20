'use strict';

var app = angular.module('photoalbumApp', ['ui.router', 'ui.bootstrap', 'angularSpinner', 'ngStorage', 'ngRoute']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('images', {
      url:'/',
      templateUrl: '/html/images.html',
      controller: 'imagesCtrl'
    })
    .state('newimage', {
      url:'/',
      templateUrl: '/html/newImage.html',
      controller: 'newImageCtrl'
    })
    .state('singleimage', {
      url:'/image/:id',
      templateUrl: '/html/singleimage.html',
      controller: 'singleImageCtrl'
    })
    .state('editimage', {
      url:'/:id',
      templateUrl: '/html/editImage.html',
      controller: 'editImageCtrl'
    })
    .state('albums', {
      url:'/',
      templateUrl: '/html/albums.html',
      controller: 'albumsCtrl'
    })
    .state('newalbum', {
      url:'/',
      templateUrl: '/html/newAlbum.html',
      controller: 'newAlbumCtrl'
    })
    .state('singlealbum', {
      url:'/album/:albumId',
      templateUrl: '/html/singleAlbum.html',
      controller: 'singleAlbumCtrl'
    })

  $urlRouterProvider.otherwise('/');
});
