

(function() {
    function RoomsCtrl() {
      this.roomArray = [
        {"name": 'Room 1'},
        {"name": 'Room 2'}
        ];
      }

    angular
        .module('BlocChat')
        .controller('RoomsCtrl', [ RoomsCtrl]);
})();
