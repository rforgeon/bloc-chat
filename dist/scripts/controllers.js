
//Global Variables
var roomId = 2;

(function() {
    function RoomsCtrl($firebaseArray,UserService) {

      var ref = firebase.database().ref();
      var fireRooms = $firebaseArray(ref.child("rooms"));
      var fireInFavor = $firebaseArray(ref.child("inFavorOf"));
      var fireMsgs = $firebaseArray(ref.child("msgs"));

      this.roomArray = fireRooms;
      // [
      //   { "emoji": '🇺🇸',
      //     "nameA": 'Hillary',
      //     "nameB": 'Trump',
      //     "roomId": 0,
      //   },
      //   { "emoji": '⚽️',
      //     "nameA": 'Arsenal',
      //     "nameB": 'Chelsea',
      //     "roomId": 1
      //   }
      // ];

      this.messagesArray = fireMsgs;
      // [
      //   {
      //     "userName": "Ralph",
      //     "content": "How's everybody doing in Room 1?",
      //     "createdAt": new Date(),
      //     "roomId": 0
      //   },
      //   {
      //     "userName": "Ralph",
      //     "inFavorOf": "",
      //     "content": "Anyone here?",
      //     "createdAt": new Date(),
      //     "roomId": 1
      //   }
      // ];


        function testUserService(){
        
        }




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
          // this.messagesArray.$add({
          //       content: "Room Created 🙌",
          //       createdAt: new Date(),
          //       roomId: roomId
          //     });

          newRoom.roomId = roomId;

          this.roomArray.$add(newRoom);

          this.setCurrentRoom(newRoom);

          roomId++;
        }

        function createMsg(newMsg){
          if (userSignedIn()){
            var user = firebase.auth().currentUser;
            var date = new Date();
            date = date.toLocaleTimeString();

            newMsg.userName = user.displayName.toLowerCase();
            newMsg.createdAt = date;
            newMsg.roomId = this.currentRoom.roomId;

            console.log(newMsg.createdAt);

            this.messagesArray.$add(newMsg);

            setRoomMsgs(this.currentRoom);

            resetCreateMsgForm();
          }else{
            alert("You must sign in to contribute to a room.");
          }
        }

        function removeOldInFavor(roomID,targetUser){
          //check if user has a preference for the current room. If they do, remove it.
          if(this.inFavorOfArray !==undefined || this.inFavorOfArray !==null){
            for (var i in this.inFavorOfArray){
              if (this.inFavorOfArray[i].inFavorUser === targetUser && this.inFavorOfArray[i].roomId === roomID){
                this.$remove(this.inFavorOfArray[i]);
              }
            }
          }else{
              console.log("removeOld skipped");
              return;
            }
        }

        function setInFavor(choice){
          console.log(choice);
          var thisUser = firebase.auth().currentUser;
          var currentRoomID = this.currentRoom.roomId;
          console.log(thisUser);
          console.log(currentRoomID);

          removeOldInFavor(currentRoomID,thisUser);
          console.log("removeOld ran");
          newInFavor.inFavorUser = thisUser;
          newInFavor.roomId = currentRoomID;
          newInFavor.inFavorOf = choice;

          this.inFavorOfArray.$add(newInFavor);
        }

        function hasInFavor(){
          console.log("hasInFavor ran");
          var user = firebase.auth().currentUser;
          for (var i in this.inFavorOfNameA){
            if (i === user){
              return this.nameA;
            }
          }
          for (var j in this.inFavorOfNameB){
            if (j === user){
              return this.nameB;
            }
          }
          return false;
        }

        function logout(){
          firebase.auth().signOut().then(function() {
              this.showLogin();// Sign-out successful.
              }, function(error) {
                // An error happened.
          });
        }

        function showLogin(){
          console.log("login ran");
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

        this.hasInFavor = hasInFavor;
        this.setInFavor = setInFavor;
        this.removeOldInFavor = removeOldInFavor;
        this.userSignedIn = userSignedIn;
        this.createMsg = createMsg;
        this.createRoom = createRoom;
        this.setRoomMsgs = setRoomMsgs;
        this.logout = logout;
        this.showLogin = showLogin;

        this.testUserService = testUserService;

      }

    angular
        .module('BlocChat')
        .controller('RoomsCtrl', ["$firebaseArray","UserService",RoomsCtrl]);
})();
