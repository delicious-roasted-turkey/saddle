
//alert(typeof module)

angular.module('saddle', ['' +
  'ui.router',
  'templates',
  'ngResource',
  'angularMoment',
  'ui.calendar',
  'ui.bootstrap'
])
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
  .state('day', {
    parent: 'reservations',
    url: '/day/:date',
    templateUrl: 'days/_day.html',
    controller: 'DayCtrl',
    resolve: {
      day: ['$stateParams', 'daysSvc', function($sp, daysSvc){
        return daysSvc.byDate($sp.date);
      }]
    }
  })
  .state('calendar', {
    parent: 'reservations',
    url: '/calendar',
    templateUrl: 'calendar/_calendar.html',
    controller: 'CalendarCtrl',
    params: {
      date: null
    }
  })
  .state('reservations-new', {
    parent: 'reservations',
    url: '/new',
    templateUrl: 'reservations/_reservation_form.html',
    controller: 'ReservationFormCtrl',
    params: {
      outingId: null
    },
    resolve: {
      crudType: function () { return 'CREATE'; },
      reservation: ['$stateParams', 'reservationsSvc', 'outing', function($sp, svc, outing){
        return svc.getNew(outing);
      }],
      outing: ['$stateParams', 'outingsSvc', function($sp, oSvc){
        return oSvc.get($sp.outingId);
      }]
    }
  })
  .state('reservations-edit', {
    parent: 'reservations',
    url: '/:id/edit',
    templateUrl: 'reservations/_reservation_form.html',
    controller: 'ReservationFormCtrl',
    resolve: {
      crudType: function () { return 'EDIT'; },
      reservation: ['$stateParams', 'reservationsSvc', function ($sp, svc) {
        return svc.get($sp.id);
      }],
      outing: ['reservation', 'outingsSvc', function(reservation, oSvc){
        return oSvc.get(reservation.outingId);
      }]
    }
  })
  .state('reservations-delete', {
    parent: 'reservations',
    url: '/:id/delete',
    controller: 'DeleteReservationCtrl',
    templateUrl: 'reservations/_reservation_delete.html',
    resolve: {
      reservation: ['$stateParams', 'reservationsSvc', function ($sp, svc) {
        return svc.get($sp.id);
      }],
      outing: ['reservation', 'outingsSvc', function(reservation, oSvc){
        return oSvc.get(reservation.outingId);
      }]
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
    controller: 'DefaultOutingFormCtrl',
    templateUrl: 'outings/_default_outing_form.html',
    resolve: {
      crudType: function(){ return 'CREATE'; },
      defaultOuting: ['defaultOutingsSvc', function(svc) {
        return svc.getNew();
      }]
    }
  })
  .state('defaultOutings-edit', {
    parent: 'defaultOutings',
    url: '/:id/edit',
    controller: 'DefaultOutingFormCtrl',
    templateUrl: 'outings/_default_outing_form.html',
    resolve: {
      crudType: function(){ return 'EDIT'; },
      defaultOuting: ['$stateParams', 'defaultOutingsSvc', function($sp, svc) {
        return svc.get($sp.id);
      }]
    }
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
  })
  .state('horses', {
    url: '/horses',
    controller: 'HorsesCtrl',
    templateUrl: 'horses/_horses.html',
    resolve: {
      horseCounts: ['horsesSvc', function(horsesSvc){
        return horsesSvc.getAll();
      }],
      currentCount: ['horsesSvc', function(horsesSvc){
        return horsesSvc.currentCount();
      }]
    }
  })
  ;

  // Go to today's day by default
  $urlRouterProvider.otherwise(function($injector){
    var $state = $injector.get('$state');
    var localDatesSvc = $injector.get('localDates');
    var dateStr = localDatesSvc.today().asStr;
    $state.go('day', {date: dateStr});
  });

}]);

// Whitelist URL protocols
angular.module('saddle')
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|skype):/);
}]);

// Configure angular-moment
angular.module('saddle')
.constant('angularMomentConfig', {
  preprocess: 'utc'
})

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
        $state.go('day', {date: dateStr});
      }

      // If the state is 'reservations' (and not one of its children)
      // redirect to current date
      if(toState.name === "reservations"){
        goHome();
      }


      // If the day state is called without a date, redirect to today's date
      if ((toState.name === "day") && !toParams.date) {
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


angular.module('saddle')
.run(['uibDatepickerPopupConfig', 'uibTimepickerConfig', function(dpc, tpc){
  // Translate buttons of datepicker
  dpc.currentText = 'Avui';
  dpc.clearText = 'Netejar';
  dpc.closeText = 'Tancar';

  // Default config for timepicker
  tpc.showMeridian = false;
}]);

angular.module('saddle')
.run(['$interval', '$timeout', 'reservationsBackupSvc', function ($interval, $timeout, reservationsBackupSvc, fileSvc) {

  var cnt = 0;
  var int = $interval(function(){
    reservationsBackupSvc.writeBackupFile();
    //reservationsBackupSvc.getText();
    cnt++;
    if(cnt >= 3){
      $interval.cancel(int);
    }
  }, 1000);


  //$timeout(reservationsBackupSvc.writeBackupFile, 2000);

}]);
