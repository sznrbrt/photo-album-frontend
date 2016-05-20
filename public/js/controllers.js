'use strict';

var app = angular.module('photoalbumApp');

app.controller('mainCtrl', function($scope, $state, $sessionStorage) {
  console.log('mainCtrl');

});

app.controller('imagesCtrl', function($scope, $state, Image) {
  console.log('imagesCtrl');
  $scope.loading = true;
  $scope.images = [];
  $scope.newImg = function() {
    $state.go('newimage');
  }
  Image.getAll()
    .then((res) => {
      $scope.images = res.data;
      $scope.loading = false;
    })
  $scope.deleteImg = (id) => {
    Image.delete(id)
      .then((res) => {
        Image.getAll()
          .then((res) => {
            $scope.images = res.data;
            $scope.loading = false;
          })
      })
  }
  $scope.openImgDetails = (id) => {
    console.log(id);
    $state.go('singleimage', {"id": id})
  }
});

app.controller('newImageCtrl', function($scope, $state, Image) {
  console.log('newImageCtrl');
  $scope.new = {};
  $scope.loading = false;
  $scope.newImage = () => {
    $scope.loading = true;
    Image.new($scope.new)
      .then((res) => {
        $scope.loading = false;
        $state.go('images');
      })
  }
});

app.controller('singleImageCtrl', function($scope, $state, Image, $stateParams, Album) {
  console.log('singleImageCtrl');
  $scope.image = {};
  Image.getOne($stateParams.id)
    .then((res) => {
      $scope.image = res.data;
      $scope.image.createdAt = new Date(res.data.createdAt);
    })
  $scope.editImage = () => {
    $state.go('editimage', {"id": $scope.image._id})
  }
  $scope.albums = {};
  Album.getAll()
    .then((res) => {
      $scope.albums = res.data;
      console.log(res.data);
      $scope.loading = false;
    })
  $scope.addToAlbum = false;
  $scope.addToAlbum = (albumId) => {
    if($scope.albumname !== undefined){
      Album.addImgToAlbumById($scope.albumname, $stateParams.id)
        .then((res) => {
          $scope.addToAlbum = true;
          $state.go('singlealbum', {"albumId": $scope.albumname});
        })
    };
  }
});

app.controller('editImageCtrl', function($scope, $state, Image, $stateParams) {
  console.log('editImageCtrl');
  $scope.edit = {};

  Image.getOne($stateParams.id)
    .then((res) => {
      $scope.edit = res.data;
    })

  $scope.cancel = () => {
    $state.go('singleimage', {"id": $stateParams.id})
  };

  $scope.editImage = () => {
    Image.editOne($stateParams.id, $scope.edit)
      .then((res) => {
        $state.go('singleimage', {"id": $stateParams.id})
      })
  }

});

app.controller('albumsCtrl', function($scope, $state, $stateParams, Album) {
  console.log('albumsCtrl');
  $scope.albums = [];
  $scope.loading = true;
  Album.getAll()
    .then((res) => {
      $scope.albums = res.data;
      console.log(res.data);
      $scope.loading = false;
    })
  $scope.newAlbum = () => {
    $state.go('newalbum')
  }
  $scope.openAlbum = (albumId) => {
    $state.go('singlealbum', {"albumId": albumId});
  }
});

app.controller('newAlbumCtrl', function($scope, $state, $stateParams, Album) {
  console.log('newAlbumCtrl');
  $scope.new = {};
  $scope.loading = false;
  $scope.newAlbum = () => {
    $scope.loading = true;
    Album.create($scope.new)
      .then((res) => {
        $scope.loading = false;
        $state.go('albums');
      })
  }
});

app.controller('singleAlbumCtrl', function($scope, $state, $stateParams, Album) {
  console.log('singleAlbumCtrl');
  $scope.album = {};
  Album.getOne($stateParams.albumId)
    .then((res) => {
      $scope.album = res.data;
    })
  $scope.removeImgFromAlbum = (id) => {
    Album.removeImgFromAlbumById($stateParams.albumId, id)
      .then((res) => {
        Album.getOne($stateParams.albumId)
          .then((res) => {
            $scope.album = res.data;
          })
      })
  }

  $scope.deleteAlbum = () => {
    Album.deleteOne($stateParams.albumId)
      .then((res) => {
        $state.go('albums');
      })
  }
});
