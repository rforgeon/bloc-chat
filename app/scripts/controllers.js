
//Global Variables
var roomId = 2;

(function() {
    function RoomsCtrl($firebaseArray) {
      var ref = firebase.database().ref();
      var fireRooms = $firebaseArray(ref.child("rooms"));
      var fireMsgs = $firebaseArray(ref.child("msgs"));

      this.roomArray = fireRooms;
      // [
      //   { "emoji": '🇺🇸',
      //     "nameA": 'Hillary',
      //     "nameB": 'Trump',
      //     "roomId": 0
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
      //     "inFavorOf": "",
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

        //Set the current Chat Room
        this.currentRoom = null;

        function setCurrentRoom(roomName){
          this.currentRoom = roomName;
          this.isCreating = false;
        }

        this.setCurrentRoom = setCurrentRoom;
        ////

        //Creating Room
        this.isCreating = false;

        function startCreating(){
          this.isCreating = true;
          this.currentRoom = null;
          resetCreateRoomForm();
          resetCreateMsgForm();
          console.log("Enter starCreating()");
        }
        function cancelCreating(){
          console.log("Enter cancelCreating()");
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

        function resetCreateRoomForm(){
          this.newRoom =
            { "emoji": '💬',
              "nameA": '',
              "nameB": '',
              "messagesArray": []
            };
          }

          function resetCreateMsgForm(){
            this.newMsg =
              {"userName": "",
              "inFavorOf": "",
              "content": "",
              "createdAt": new Date(),
              "roomId": 0
              };
            }

        function createRoom(newRoom){
          console.log("Enter createRoom: roomA: "+this.roomArray.roomA+" roomB: "+this.roomArray.roomB);

          // this.messagesArray = [{
          //       content: "Room Created 🙌",
          //       createdAt: new Date(),
          //       roomId: roomId
          //     }];

          newRoom.roomId = roomId;

          this.roomArray.$add(newRoom);

          resetCreateRoomForm();
          roomId++;
        }

        function createMsg(newMsg){

            newMsg.userName = "Ralph";
            newMsg.createdAt = new Date();
            newMsg.roomId = this.currentRoom.roomId;

            this.messagesArray.$add(newMsg);

          setRoomMsgs(this.currentRoom);
          resetCreateMsgForm();
        }

        this.createMsg = createMsg;
        this.createRoom = createRoom;
        this.setRoomMsgs = setRoomMsgs;

      }

    angular
        .module('BlocChat')
        .controller('RoomsCtrl', ["$firebaseArray",RoomsCtrl]);
})();
