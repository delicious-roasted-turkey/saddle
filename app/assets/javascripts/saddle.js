angular.module('saddle', ['ui.router', 'templates', 'ngResource', 'angularMoment'])
.config([
'$stateProvider',
'$urlRouterProvider',
'$compileProvider',
function($stateProvider, $urlRouterProvider, $compileProvider){

  // Define "schedule" state as the root state of
  // the app. This is likely to change in the future
  // as the app grows.
  $stateProvider
  .state('schedule', {
    url: '/schedule',
    templateUrl: 'schedule/_schedule.html',
    controller: 'ScheduleCtrl',
    params: {
      day: null
    }
  })
  .state('addReservation', {
    url: '/add-reservation',
    templateUrl: 'reservations/_reservationForm.html',
    controller: 'AddReservationCtrl',
    params: {
      day: null,
      outing: null
    }
  })
  .state('editReservation', {
    url: '/edit-reservation',
    templateUrl: 'reservations/_reservationForm.html',
    controller: 'EditReservationCtrl',
    params: {
      day: null,
      outing: null,
      reservation: null
    }
  })

  .state('defaultOutings', {
    url: '/default-outings',
    templateUrl: 'outings/_defaultOutings.html',
    controller: 'DefaultOutingsCtrl',
    resolve: {
      defaultOutings: ["defaultOutingsSvc", function (defaultOutingsSvc) {
        console.log("resolving")
        return defaultOutingsSvc.getAll();
      }]
    }
  });

  $urlRouterProvider.otherwise('schedule');

  // Whitelist URL protocols
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|skype):/);

}]);

