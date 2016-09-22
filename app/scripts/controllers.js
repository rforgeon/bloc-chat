angular.module('BlocChat.controllers', [])
  .controller('RoomsCtrl', ['$scope', 'Room', '$modal', 'Message', '$cookies', function($scope, Room, $modal, Message, $cookies){

    $scope.messages = [];
    $scope.rooms = Room.all;
    $scope.currentRoom = {};

    $scope.setCurrentRoom = function(room) {
      $scope.currentRoom = room;
      $scope.messages = Room.messages($scope.currentRoom.$id);
    };

  }]);
