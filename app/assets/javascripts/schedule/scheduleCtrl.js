angular.module("saddle")
.controller("ScheduleCtrl", [
"$scope",
"localDates",
"days",
"numAvailableHorses",
function($scope, localDates, days, numAvailableHorses){

  // Get today's date 
  //$scope.day = localDates.today();
  $scope.day = days.byDate(localDates.today());

  $scope.nextDay = function(){
    $scope.day = days.byDate($scope.day.localDate.nextDay());
  };

  $scope.prevDay = function(){
    $scope.day = days.byDate($scope.day.localDate.prevDay());
  };

  $scope.numAvailableHorses = numAvailableHorses;

  $scope.reservedPlaces = function(outing){
    return outing.reservations.map(function(r){ return r.numPersons; })
      .reduce(function(prev, current) {
        return prev + current;
    }, 0);
  }

}]);
