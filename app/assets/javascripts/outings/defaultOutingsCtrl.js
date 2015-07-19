angular.module("saddle")
.controller("DefaultOutingsCtrl", [
"$scope",
"defaultOutings",
function($scope, defaultOutings){
  console.log(defaultOutings);
  $scope.defaultOutings = defaultOutings;
}]);