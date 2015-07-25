angular.module("saddle")
.controller("DefaultOutingsListCtrl", [
"$scope",
"defaultOutings",
function($scope, defaultOutings){
  $scope.defaultOutings = defaultOutings;
}]);