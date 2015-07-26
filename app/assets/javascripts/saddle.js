angular.module('saddle', ['ui.router', 'templates', 'ngResource', 'angularMoment'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('reservations', {
    url: '/reservations',
    template: '<ui-view></ui-view>'
  })
  .state('outings', {
    parent: 'reservations',
    url: '/outings',
    abstract: true,
    template: '<ui-view></ui-view>'
  })
  .state('outings-new', {
    parent: 'outings',
    url: '/new',
    templateUrl: 'outings/_outing_form.html',
    controller: 'OutingFormCtrl',
    params: {
      date: null
    },
    resolve: {
      crudType: function(){ return 'CREATE'; },
      outing: ['$stateParams', 'outingsSvc', function($sp, svc) {
        return svc.getNew($sp.date);
      }]
    }
  })
  .state('outings-edit', {
    parent: 'outings',
    url: '/:id/edit',
    templateUrl: 'outings/_outing_form.html',
    controller: 'OutingFormCtrl',
    resolve: {
      crudType: function(){ return 'EDIT'; },
      outing: ['$stateParams', 'outingsSvc', function($sp, svc) {
        return svc.get($sp.id);
      }]
    }
  })
  .state('outings-delete', {
    parent: 'outings',
    url: '/:id/delete',
    controller: 'DeleteOutingCtrl',
    templateUrl: 'outings/_outing_delete.html',
    resolve: {
      outing: ['$stateParams', 'outingsSvc', function(sp, svc){
        return svc.get(sp.id);
      }]
    }
  })
  .state('schedule', {
    parent: 'reservations',
    url: '/schedule/:date',
    templateUrl: 'schedule/_schedule.html',
    controller: 'ScheduleCtrl',
    resolve: {
      day: ['$stateParams', 'days', function($sp, days){
        return days.byDate($sp.date);
      }]
    }
  })
  .state('addReservation', {
    parent: 'reservations',
    url: '/add',
    templateUrl: 'reservations/_reservation_form.html',
    controller: 'AddReservationCtrl',
    params: {
      day: null,
      outing: null
    }
  })
  .state('editReservation', {
    parent: 'reservations',
    url: '/edit',
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

  // Go to today's schedule by default
  $urlRouterProvider.otherwise(function($injector){
    var $state = $injector.get('$state');
    var localDatesSvc = $injector.get('localDates');
    var dateStr = localDatesSvc.today().asStr;
    $state.go('schedule', {date: dateStr});
  });

}]);

// Whitelist URL protocols
angular.module('saddle')
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|skype):/);
}]);


/**
 * Route defaults and redirections.
 */
angular.module('saddle')
.run(['$rootScope', '$state', 'localDates',
    function($rootScope, $state, localDates) {


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      function goHome(){
        event.preventDefault();
        var dateStr = localDates.today().asStr;
        $state.go('schedule', {date: dateStr});
      }

      // If the schedule state is called without a date, redirect to today's date
      if ((toState.name === "schedule") && !toParams.date) {
        goHome();
      }

      // Make params required.
      if ((toState.name === "outings-new") && !toParams.date) {
        goHome();
      }

      // Set a "redirection" from parent state "defaultOutings" to default
      // child "defaultOutings-list". Cannot use $urlRouterProvider.when
      // because it doesn't get always caught.
      // See http://stackoverflow.com/questions/27120308/angular-ui-router-urlrouterprovider-when-not-working-when-i-click-a-ui-sref
      if (toState.name === "defaultOutings") {
        event.preventDefault();
        $state.go('defaultOutings-list');
      }
    });

}]);

/**
 * Remember previous states
 */
angular.module('saddle')
.run( [ '$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
    $rootScope.$previousState = from;
    $rootScope.$previousStateParams = fromParams;
  });
}]);

