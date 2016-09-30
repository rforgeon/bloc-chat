
 (function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
          .html5Mode({
             enabled: true,
             requireBase: false
           });

       $stateProvider
        .state('home', {
            url: '/',
            controller: 'RoomsCtrl as Rooms',
            templateUrl: '/templates/home.html'
        });
     }
      angular
         .module('BlocChat', ['ui.router', 'firebase'])
         .config(config);

 })();
