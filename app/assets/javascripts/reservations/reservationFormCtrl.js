angular.module("saddle")
.controller("ReservationFormCtrl", [
"$scope",
"$state",
"crudType",
"reservation",
"outing",
"reservationsSvc",
function($scope, $state, crudType, reservation, outing, reservationsSvc){

  $scope.reservation = reservation;
  $scope.outing = outing;

  var saveAction = {
    'CREATE': reservationsSvc.create,
    'EDIT': reservationsSvc.update
  }[crudType];

  $scope.submit = function(){
    $scope.atmpSubmit = true;
    if($scope.resv_form.$valid) {
      saveAction($scope.reservation)
        .then(function () {
          $state.go("day", {date: $scope.outing.day.date});
        });
    }
  }

}]);