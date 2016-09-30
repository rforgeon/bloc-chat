

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


     (function() {
         function UserService($firebaseAuth) {
           this.myName = "test";

           var authService = $firebaseAuth();
           var myUser = authService.currentUser;
           console.log("currentUser on service: ",myUser);




          //  function userName(){
          //    firebase.auth().onAuthStateChanged(function(user) {
          //       if (user) {
          //         console.log('UserService user:'+user.displayName);
          //         UserService.userName = firebase.auth().currentUser.displayName;
          //         console.log("inside currentUser: "+UserService.userName);
          //         return UserService.userName;
          //       } else {
          //         console.log("UserService doesn't think there is a user");
          //       }
          //    });
          //  }

             this.myName = userName();
             console.log("Outside ThisUserName: "+this.myName);


             // this.displayName = user.displayName;
             // var email = user.email;
             // var emailVerified = user.emailVerified;
             // var photoURL = user.photoURL;
             // var uid = user.uid;
             // var providerData = user.providerData;
             //
             //
             //
             // console.log('in UserService email: '+email);
             // console.log('in UserService desplayName: '+this.displayName);

             return{
               data: this.myName
             };
         }

       angular
           .module('BlocChat')
           .factory('UserService', ["$firebaseAuth",UserService]);

   })();

     window.addEventListener('load', function() {
       initApp();
     });
