angular.module("saddle")
.controller("EditReservationCtrl", [
"$scope",
"$stateParams",
"$state",
function($scope, $stateParams, $state){

  $scope.day = $stateParams.day;
  $scope.outing = $stateParams.outing;

  // We keep the changes in a clone of the reservation, which will
  // replace the original reservation once the user submits the action.
  // This will not be necessary once the backend is integrated, since
  // we can simply refetch the original data on cancel.
  var originalReservation = $stateParams.reservation;
  $scope.reservation = angular.copy(originalReservation);

  $scope.submit = function(){
    angular.merge(originalReservation, $scope.reservation);
    $scope.goToSchedule();
  }

  $scope.goToSchedule = function(){
    $state.go("schedule", {
      day: $scope.day
    })
  }

}]);