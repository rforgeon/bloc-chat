
//Global Variables
var roomId = 2;

(function() {
    function RoomsCtrl($firebaseArray,UserService) {

      var ref = firebase.database().ref();
      var fireRooms = $firebaseArray(ref.child("rooms"));
      var fireUsers = $firebaseArray(ref.child("userData"));
      var fireMsgs = $firebaseArray(ref.child("msgs"));

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
      //   },
      //   {
      //     "userName": "Ralph",
      //     "inFavorOf": "",
      //     "content": "Anyone here?",
      //     "createdAt": new Date(),
      //     "uid": "aoijhi24",
      //     "roomId": 1
      //   }
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
          var user = UserService;

          // this.messagesArray.$add({
          //       content: "Room Created 🙌",
          //       createdAt: new Date(),
          //       roomId: roomId
          //     });

          newRoom.roomId = roomId;
          newRoom.uid = user.uid;

          this.roomArray.$add(newRoom);

          this.setCurrentRoom(newRoom);

          roomId++;
        }

        function createMsg(newMsg){
          if (userSignedIn()){
            var user = UserService;
            var date = new Date();
            date = date.toLocaleTimeString();

            newMsg.userName = user.userName.toLowerCase();
            newMsg.createdAt = date;
            newMsg.roomId = this.currentRoom.roomId;
            newMsg.uid = user.uid;
            console.log("MsgArray: ",this.messagesArray);
            this.messagesArray.$add(newMsg);

            setRoomMsgs(this.currentRoom);

          }else{
            alert("You must sign in to contribute to a room.");
          }
        }

        function setCurrentUserData(){
          var currentUser = UserService.uid;
          console.log("currentUser: "+currentUser);
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser){
              return;
            }
          }
          //if user does not exist, create new user
          var newUser = {"uid": 1};
          // newUser.uid = currentUser;
          console.log("newUser: "+newUser.uid);
          console.log("userArray: ",this.fireUsersArray);
          this.fireUsersArray.$add(newUser);
        }

        function getCurrentUserData(){
          var currentUser = UserService.uid;
          console.log("currentUser: "+currentUser);
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser){
              return this.fireUsersArray[i];
            }
          }
        }

        function removeOldInFavor(roomID){
          var currentUser = UserService.uid;
          console.log("currentUser: "+currentUser);
          //check if current user has a preference
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser){
              //clear preference
              this.fireUsersArray[i].roomId[roomID].preference = '';
            }
          }
          //if user does not exist, create new user
          var newUser = {"uid": currentUser};
          console.log("newUser: "+newUser.uid);
          console.log("userArray: ",this.fireUsersArray);

          this.fireUsersArray.$add(newUser);
        }

        function setInFavor(choice){
          var currentRoomID = this.currentRoom.roomId;
          var noPreferenceForRoom = true;

          var currentUser = UserService.uid;
          //check if current user has a preference for this room
          for (var i in this.fireUsersArray){
            if (this.fireUsersArray[i].uid === currentUser && this.fireUsersArray[i].roomId === currentRoomID){
              console.log("if ran "+this.fireUsersArray[i].preference);  
              this.fireUsersArray[i].preference = choice;
              noPreferenceForRoom = false;
            }
          }
          if (noPreferenceForRoom){
            //if user does not exist, create new user
            var newPreference = {"uid": currentUser};
            newPreference.roomId = currentRoomID;
            newPreference.preference = choice;

            this.fireUsersArray.$add(newPreference);
          }
        }

        function hasInFavor(){
          var currentRoomID = this.currentRoom.roomId;
          var user = getCurrentUserData();
          if (user.uid.roomId[currentRoomID].preference !==''){
            return true;
          }
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

        this.setCurrentUserData = setCurrentUserData;
        this.getCurrentUserData = getCurrentUserData;
        this.hasInFavor = hasInFavor;
        this.setInFavor = setInFavor;
        this.removeOldInFavor = removeOldInFavor;
        this.userSignedIn = userSignedIn;
        this.createMsg = createMsg;
        this.createRoom = createRoom;
        this.setRoomMsgs = setRoomMsgs;
        this.logout = logout;
        this.showLogin = showLogin;

      }

    angular
        .module('BlocChat')
        .controller('RoomsCtrl', ["$firebaseArray","UserService",RoomsCtrl]);
})();
