

(function() {
    function RoomsCtrl() {
      this.roomArray = [
        {"name": 'Room 1',
          "messagesArray": [
              {
                "userName": "Ralph",
                "content": "How's everybody doing in Room 1?",
                "createdAt": new Date()
              }
            ]},
        {"name": 'Room 2',
        "messagesArray": [
            {
              "userName": "Toby Castro",
              "content": "How's everybody doing in Room 2?",
              "createdAt": new Date()
            },
            {
              "userName": "Bruce Wayne",
              "content": "Not too shabby",
              "createdAt": new Date()
            },
            {
              "userName": "Toby Castro",
              "content": "How are things?",
              "createdAt": new Date()
            }
          ]}
        ];


      this.messagesArray = [
        {
          userName: "Toby Castro",
          content: "How's everybody doing in Room 2?",
          createdAt: new Date()
        },
        {
          userName: "Bruce Wayne",
          content: "Not too shabby",
          createdAt: new Date()
        },
        {
          userName: "Toby Castro",
          content: "How are things?",
          createdAt: new Date()
        }
        ];

        this.currentRoom = null;

        function setCurrentRoom(roomName){
          this.currentRoom = roomName;
        }

        this.setCurrentRoom = setCurrentRoom;

      }


    angular
        .module('BlocChat')
        .controller('RoomsCtrl', [ RoomsCtrl]);
})();
