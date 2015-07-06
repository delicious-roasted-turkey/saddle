angular.module("saddle")
.controller("AddReservationCtrl", [
"$scope",
"$stateParams",
"$state",
function($scope, $stateParams, $state){

  $scope.day = $stateParams.day;
  $scope.outing = $stateParams.outing;

  $scope.submit = function(){
    $scope.outing.reservations.push($scope.reservation);
    $scope.goToSchedule();
  }

  $scope.goToSchedule = function(){
    $state.go("schedule", {
      day: $scope.day
    })
  }

}]);