angular.module('BlocChat.samples', [])
  .value('sampleRooms', [
    {
      name: 'Room 1',
      messages: [
        {
          userName: "Toby Castro",
          content: "How's everybody doing in Room 1?",
          createdAt: new Date()
        },
        {
          userName: "Bruce Wayne",
          content: "Pretty good",
          createdAt: new Date()
        },
        {
          userName: "Bruce Wayne",
          content: "How bout you?",
          createdAt: new Date()
        }
      ]
    },
    {
      name: 'Room 2',
      messages: [
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
      ]
    }
  ])

.constant('FIREBASE_URL', 'https://fiery-torch-7994.firebaseio.com');
