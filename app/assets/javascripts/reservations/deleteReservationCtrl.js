angular.module('saddle')
.controller('DeleteReservationCtrl', [
'$scope',
'$state',
'outing',
'reservation',
'reservationsSvc',
function($scope, $state, outing, reservation, reservationsSvc){

  $scope.reservation = reservation;
  $scope.outing = outing;

  $scope.submit = function(){
    reservationsSvc.destroy(reservation.id)
      .finally(function(){
        $state.go("schedule", {date: $scope.outing.day.date});
      })
  }

}]);