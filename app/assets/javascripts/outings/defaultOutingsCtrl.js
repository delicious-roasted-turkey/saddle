angular.module("saddle")
.controller("DefaultOutingsCtrl", [
"$scope",
"defaultOutings",
function($scope, defaultOutings){
  $scope.defaultOutings = defaultOutings;
}]);