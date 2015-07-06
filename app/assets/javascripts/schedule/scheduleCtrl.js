angular.module("saddle")
.controller("ScheduleCtrl", [
"$scope",
"$stateParams",
"localDates",
"days",
"numAvailableHorses",
function($scope, $stateParams, localDates, days, numAvailableHorses){

  $scope.day = $stateParams.day || days.byDate(localDates.today());

  $scope.nextDay = function(){
    $scope.day = days.byDate($scope.day.localDate.nextDay());
  };

  $scope.prevDay = function(){
    $scope.day = days.byDate($scope.day.localDate.prevDay());
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
