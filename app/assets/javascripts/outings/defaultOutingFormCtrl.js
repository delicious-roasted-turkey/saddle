angular.module("saddle")
.controller("DefaultOutingFormCtrl", [
  "$scope",
  "$state",
  "crudType",
  "defaultOuting",
  "defaultOutingsSvc",
  function($scope, $state, crudType, defaultOuting, defaultOutingsSvc){

    $scope.defaultOuting = defaultOuting;

    var saveAction = {
      'CREATE': defaultOutingsSvc.create,
      'EDIT': defaultOutingsSvc.update
    }[crudType];

    $scope.submit = function(){
      $scope.atmpSubmit = true;
      if($scope.new_defout_form.$valid) {
        saveAction($scope.defaultOuting)
          .then(function () {
            $state.go("defaultOutings-list");
          });
      }
    }

}]);