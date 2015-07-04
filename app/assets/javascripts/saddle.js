angular.module("saddle", ["ui.router", "templates"])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

  // Define "schedule" state as the root state of
  // the app. This is likely to change in the future
  // as the app grows.
  $stateProvider
  .state('schedule', {
    url: '/schedule',
    templateUrl: 'schedule/_schedule.html',
    controller: 'ScheduleCtrl'
  });

  $urlRouterProvider.otherwise('schedule');
}]);
