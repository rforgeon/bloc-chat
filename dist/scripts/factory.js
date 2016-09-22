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
