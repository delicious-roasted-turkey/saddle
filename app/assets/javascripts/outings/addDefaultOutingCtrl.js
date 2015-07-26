angular.module("saddle")
.controller("AddDefaultOutingCtrl", [
  "$scope",
  "$state",
  "defaultOutingsSvc",
  function($scope, $state, defaultOutingsSvc){

    $scope.defaultOuting = {};

    $scope.submit = function(){
      $scope.atmpSubmit = true;
      if($scope.new_defout_form.$valid) {
        defaultOutingsSvc.create($scope.defaultOuting)
          .then(function () {
            $state.go("defaultOutings-list");
          });
      }
    }

}]);