// (function() {
//   function Room($firebaseArray) {
//     var ref = firebase.database().ref().child("rooms");
//     var rooms = $firebaseArray(ref);
//
//     return {
//       all: rooms
//     };
//   }
//
//   angular
//     .module('blocChat')
//     .factory('Room', ['$firebaseArray', Room]);
// })();

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBHbwgKHE4r-Z8zE4x3mLAyATEQiROG_7A",
   authDomain: "bloc-chat-8c9cf.firebaseapp.com",
   databaseURL: "https://bloc-chat-8c9cf.firebaseio.com",
   storageBucket: "bloc-chat-8c9cf.appspot.com",
   messagingSenderId: "1499322292"
 };
 firebase.initializeApp(config);

 
