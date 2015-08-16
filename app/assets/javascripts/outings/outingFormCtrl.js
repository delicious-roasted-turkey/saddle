angular.module('saddle')
.controller('OutingFormCtrl', [
'$scope',
'$state',
'crudType',
'outing',
'outingsSvc',
function($scope, $state, crudType, outing, outingsSvc){

  $scope.outing = outing;

  var saveAction = {
    'CREATE': outingsSvc.create,
    'EDIT': outingsSvc.update
  }[crudType];

  $scope.submit = function(){
    $scope.atmpSubmit = true;
    if($scope.outing_form.$valid) {
      saveAction($scope.outing)
      .then(function () {
        $state.go("day", {date: $scope.outing.day.date});
      });
    }
  }
}]);

