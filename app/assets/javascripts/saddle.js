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
    templateUrl: 'reservations/_reservation_form.html',
    controller: 'AddReservationCtrl',
    params: {
      day: null,
      outing: null
    }
  })
  .state('editReservation', {
    url: '/edit-reservation',
    templateUrl: 'reservations/_reservation_form.html',
    controller: 'EditReservationCtrl',
    params: {
      day: null,
      outing: null,
      reservation: null
    }
  })

  .state('defaultOutings', {
    url: '/default-outings',
    templateUrl: 'outings/_default_outings.html'
  })
  .state('defaultOutings-list', {
    url: '/list',
    parent: 'defaultOutings',
    templateUrl: 'outings/_default_outings_list.html',
    controller: 'DefaultOutingsListCtrl',
    resolve: {
      defaultOutings: ["defaultOutingsSvc", function (defaultOutingsSvc) {
        return defaultOutingsSvc.getAll();
      }]
    }
  })
  .state('defaultOutings-new', {
    url: '/new',
    parent: 'defaultOutings',
    controller: 'AddDefaultOutingCtrl',
    templateUrl: 'outings/_default_outings_new.html'
  })
  .state('defaultOutings-delete', {
    url: '/:id/delete',
    parent: 'defaultOutings',
    controller: 'DeleteDefaultOutingCtrl',
    templateUrl: 'outings/_default_outings_delete.html',
    resolve: {
     defaultOuting: ['$stateParams', 'defaultOutingsSvc', function(sp, svc){
       return svc.get(sp.id);
     }]
    }

  });

  $urlRouterProvider.otherwise('schedule');

  // Whitelist URL protocols
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|skype):/);

}]);

