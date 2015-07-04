angular.module("saddle")
.controller("ScheduleCtrl", [
"$scope",
"LocalDate",
function($scope, LocalDate){

  // Get today's date 
  $scope.day = LocalDate.today();

  $scope.nextDay = function(){
    $scope.day = $scope.day.nextDay();
  };

  $scope.prevDay = function(){
    $scope.day = $scope.day.prevDay();
  };

}]);
