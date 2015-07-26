angular.module('saddle')
.controller('ScheduleCtrl', [
'$scope',
'$stateParams',
'$state',
'localDates',
'days',
'numAvailableHorses',
'day',
function($scope, $stateParams, $state, localDates, days, numAvailableHorses, day){

  var localDate = localDates.fromIso8601(day.date);

  $scope.localDate = localDate;
  $scope.day = day;

  $scope.nextDay = function(){
    $state.go('schedule', {date: localDate.nextDay().asStr});
  };

  $scope.prevDay = function(){
    $state.go('schedule', {date: localDate.prevDay().asStr});
  };

  $scope.numAvailableHorses = numAvailableHorses;

  $scope.reservedPlaces = function(outing){
    return outing.reservations.map(function(r){ return r.numPersons || 0; })
      .reduce(function(prev, current) {
        return prev + current;
    }, 0
    );
  }

}]);


angular.module('saddle')
.run(['$rootScope', '$state', 'localDates', function($rootScope, $state, localDates) {


}]);
