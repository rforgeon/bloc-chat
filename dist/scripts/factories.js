

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBHbwgKHE4r-Z8zE4x3mLAyATEQiROG_7A",
   authDomain: "bloc-chat-8c9cf.firebaseapp.com",
   databaseURL: "https://bloc-chat-8c9cf.firebaseio.com",
   storageBucket: "bloc-chat-8c9cf.appspot.com",
   messagingSenderId: "1499322292"
 };
 firebase.initializeApp(config);

 // FirebaseUI config.
      PROVIDER_ID = '1813822715517958';
      var uiConfig = {
        'signInFlow': 'popup',
        'signInOptions': [

          // Leave the lines as is for the providers you want to offer your users.

          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
      };

      // // Initialize the FirebaseUI Widget using Firebase.
      // var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // // The start method will wait until the DOM is loaded.
      // ui.start('#firebaseui-auth-container', uiConfig);

    //   (function() {
    //       function UserService() {
    //
    //         firebase.auth().onAuthStateChanged(function(user) {
    //           if (user) {
    //             // User is signed in.
    //             this.displayName = user.displayName;
    //             this.email = user.email;
    //             this.emailVerified = user.emailVerified;
    //             this.photoURL = user.photoURL;
    //             this.uid = user.uid;
    //             this.providerData = user.providerData;
    //           } else {
    //             // User is signed out.
    //             document.getElementById('sign-in-status').textContent = 'Signed out';
    //             document.getElementById('sign-in').textContent = 'Sign in';
    //             document.getElementById('account-details').textContent = 'null';
    //           }
    //         }, function(error) {
    //           console.log(error);
    //         });
    //       }
    //
    //     angular
    //         .module('BlocChat')
    //         .factory('UserService', [UserService]);
    // })();
    //
    //
    //



  initApp = function() {
       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var uid = user.uid;
           var providerData = user.providerData;
           user.getToken().then(function(accessToken) {
             document.getElementById('sign-in-status').textContent = 'Signed in';
             document.getElementById('sign-in').textContent = 'Sign out';
             document.getElementById('account-details').textContent = JSON.stringify({
               displayName: displayName,
               email: email,
               emailVerified: emailVerified,
               photoURL: photoURL,
               uid: uid,
               accessToken: accessToken,
               providerData: providerData
             }, null, '  ');
           });
         } else {
           // User is signed out.
           document.getElementById('sign-in-status').textContent = 'Signed out';
           document.getElementById('sign-in').textContent = 'Sign in';
           document.getElementById('account-details').textContent = 'null';
         }
       }, function(error) {
         console.log(error);
       });
     };

     window.addEventListener('load', function() {
       initApp();
     });
