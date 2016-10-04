

(function() {
    function RoomsCtrl($firebaseArray, $firebaseObject, UserService, $location, $anchorScroll) {

      var ref = firebase.database().ref();
      var fireRooms = $firebaseArray(ref.child("rooms"));
      var fireUsers = $firebaseArray(ref.child("userData"));
      var fireMsgs = $firebaseArray(ref.child("msgs"));
      var fireCounter = $firebaseObject(ref.child("roomId"));

      this.roomArray = fireRooms;
      // [
      //   { "emoji": '🇺🇸',
      //     "nameA": 'Hillary',
      //     "nameB": 'Trump',
      //     "uid": "aoijhi24",
      //     "roomId": 0,
      //   },
      //   { "emoji": '⚽️',
      //     "nameA": 'Arsenal',
      //     "nameB": 'Chelsea',
      //     "uid": "aoijhi24",
      //     "roomId": 1
      //   }
      // ];

      this.messagesArray = fireMsgs;
      // [
      //   {
      //     "userName": "Ralph",
      //     "content": "How's everybody doing in Room 1?",
      //     "createdAt": new Date(),
      //     "uid": "aoijhi24",
      //     "roomId": 0
      //     "choice": 'A'
      //   },
      // ];

      this.fireUsersArray = fireUsers;
    // [
      // {
      //   "uid": aski8eefekh,
      //      {"roomId":
      //            1:,
      //              {"preference": "A"}
      //      }
      // },
    // ]

      this.fireCounter = fireCounter;

        //Set the current Chat Room
        this.currentRoom = null;
        this.popupOpen = true;

        function setCurrentRoom(roomName){
          this.currentRoom = roomName;
          this.isCreating = false;
          this.popupOpen = true;
      
        }

        this.setCurrentRoom = setCurrentRoom;
        ////

        //Creating Room
        this.isCreating = false;

        function startCreating(){
          if(userSignedIn()){
            this.isCreating = true;
            this.currentRoom = null;
          }
          else{
            alert("You must sign in to create a room.");
          }
        }

        function cancelCreating(){
          this.isCreating = false;
        }

        function shouldShowCreating(){
          return this.isCreating;
        }

        this.startCreating = startCreating;
        this.cancelCreating = cancelCreating;
        this.shouldShowCreating = shouldShowCreating;
        ///

        //CRUD
        function setRoomMsgs(room){
          var thisRoomsMsgs = [];
          for (var i in this.messagesArray){
            if (this.messagesArray[i].roomId === room.roomId){
              thisRoomsMsgs.push(this.messagesArray[i]);
            }
          }
          return thisRoomsMsgs;
        }

        function createRoom(newRoom){
          if (this.fireCounter.value === null || this.fireCounter.value === undefined){
            this.fireCounter.value = 1;
            fireCounter.$save();
          }
          else{
            fireCounter.value++;
            fireCounter.$save();
          }
          var user = UserService;

          newRoom.roomId = this.fireCounter.value;
          newRoom.uid = user.uid;

          this.roomArray.$add(newRoom);

          this.setCurrentRoom(newRoom);

        }

        function createMsg(newMsg){
          var roomId = this.fireCounter.value;
          if (userSignedIn()){
            var preference="";
            var currentRoomID = this.currentRoom.roomId;
            var currentUser = UserService.uid;
            console.log("currentRoomID "+currentRoomID);
            console.log("current user "+currentUser);
            for (var i in this.fireUsersArray){
              if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
                 preference = this.fireUsersArray[i].preference;
              }
            }

            var user = UserService;
            var date = new Date();
            date = date.toLocaleTimeString();

            newMsg.userName = user.userName.toLowerCase();
            newMsg.createdAt = date;
            newMsg.roomId = this.currentRoom.roomId;
            newMsg.uid = user.uid;
            newMsg.preference = preference;

            this.messagesArray.$add(newMsg);

            setRoomMsgs(this.currentRoom);

            // send scroll to bottom of messages
            $location.hash('/');

            // call $anchorScroll()
            $anchorScroll();

          }else{
            alert("You must sign in to contribute to a room.");
          }
        }

        function setCurrentUserData(){
          var currentUser = UserService.uid;
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser){
              return;
            }
          }
          //if user does not exist, create new user
          var newUser = {"uid": 1};
          // newUser.uid = currentUser;
          this.fireUsersArray.$add(newUser);
        }

        function getRoomPrefForUser(){
          var preference;
          var currentRoomID = this.currentRoom.roomId;
          var currentUser = UserService.uid;
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
               preference = this.fireUsersArray[i].preference;
            }
            preference = "";
          }
        }

        function setPreference(choice){
          var newRoomId = this.fireCounter.value;
          var currentRoomID = this.currentRoom.roomId;
          var noPreferenceForRoom = true;

          var currentUser = UserService.uid;
          //check if current user has a preference for this room
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
              this.fireUsersArray[i].preference = choice;
              this.fireUsersArray.$save(this.fireUsersArray[i]);
              noPreferenceForRoom = false;

            }
          }
          if (noPreferenceForRoom){
            //if user does not exist, create new user
            var newPreference = {"uid": currentUser};
            newPreference.roomId = newRoomId;
            newPreference.preference = choice;

            this.fireUsersArray.$add(newPreference);

          }
          noPreferenceForRoom = true;
        }

        function hasNoPreference(){
          var currentRoomID = this.currentRoom.roomId;
          var currentUser = UserService.uid;
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
              return false;
            }
          }
          return true;
        }

        function setSelected(choice){
          var currentUser = UserService.uid;
          var currentRoomID = this.currentRoom.roomId;
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
              if(this.fireUsersArray[i].preference === choice){
                return true;
              }else{
                return false;
              }
            }
          }
          return false;
        }

        function getMsgPref(){
          console.log(this);
          console.log("msg pref: "+this.preference);
          if(this.preference == "A"){
            return true;
          }else if(this.preference == "B"){
            return false;
          }
          return null;
        }

        function logout(){
          firebase.auth().signOut().then(function() {
              this.showLogin();// Sign-out successful.
              }, function(error) {
                // An error happened.
          });
        }

        function showLogin(){
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            // The start method will wait until the DOM is loaded.
            ui.start("#firebaseui-auth-container",uiConfig);
        }

        function userSignedIn(){
            if (firebase.auth().currentUser !== null ) {
                return true;  // User is signed in.
              } else {
                return false; // No user is signed in.
            }
        }

        this.getMsgPref = getMsgPref;
        this.setSelected = setSelected;
        this.setCurrentUserData = setCurrentUserData;
        this.getRoomPrefForUser = getRoomPrefForUser;
        this.hasNoPreference = hasNoPreference;
        this.setPreference = setPreference;
        this.userSignedIn = userSignedIn;
        this.createMsg = createMsg;
        this.createRoom = createRoom;
        this.setRoomMsgs = setRoomMsgs;
        this.logout = logout;
        this.showLogin = showLogin;

      }

    angular
        .module('BlocChat')
        .controller('RoomsCtrl', ["$firebaseArray","$firebaseObject","UserService","$location", "$anchorScroll",RoomsCtrl]);
})();
