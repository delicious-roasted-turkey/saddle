angular.module('saddle')
.controller('DeleteOutingCtrl', [
'$scope',
'$state',
'outingsSvc',
'outing',
function($scope, $state, outingsSvc, outing){

  $scope.outing = outing;

  $scope.submit = function(){
    var date = $scope.outing.day.date;
    outingsSvc.destroy(outing.id)
    .finally(function(){
      $state.go("day", {date: date});
    });
  }

}]);