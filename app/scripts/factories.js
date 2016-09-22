// Initialize the Firebase SDK
var config = {
  apiKey: 'AIzaSyBHbwgKHE4r-Z8zE4x3mLAyATEQiROG_7A',
  authDomain: 'bloc-chat-8c9cf.firebaseapp.com',
  databaseURL: 'https://bloc-chat-8c9cf.firebaseio.com',
  storageBucket: 'bloc-chat-8c9cf.appspot.com',
};
firebase.initializeApp(config);


angular.module('BlocChat.factories',[])

.factory('Room', ['$firebase', 'FIREBASE_URL', function($firebase, FIREBASE_URL){

   var firebaseRef = new Firebase(FIREBASE_URL);
   var rooms = $firebase(firebaseRef.child('rooms')).$asArray();

   var room = {
     all: rooms,
     create: function(room) {
       return rooms.$add(room);
     },
     delete: function(room) {
       return rooms.$remove(room);
     },
     messages: function(roomId) {
       return $firebase(firebaseRef.child('messages').orderByChild('roomId').equalTo(roomId)).$asArray();
     }
   };
   return room;
 }]);
