var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://bloc-chat-8c9cf.firebaseio.com/messages");
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.messages = $firebaseArray(ref);

  // add new items to the array
// the message is automatically added to our Firebase database!
$scope.addMessage = function() {
  $scope.messages.$add({
    text: $scope.newMessageText
  });
};

});
