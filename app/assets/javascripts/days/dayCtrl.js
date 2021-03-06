angular.module('saddle')
.controller('DayCtrl', [
'$scope',
'$stateParams',
'$state',
'localDates',
'outingsSvc',
'daysSvc',
'day',
function($scope, $stateParams, $state, localDates, outingsSvc, daysSvc, day){

  var localDate = localDates.fromIso8601(day.date);

  $scope.localDate = localDate;
  $scope.day = day;

  $scope.today = localDates.today()

  $scope.editingComments = false;

  $scope.editComments = function(){
    $scope.editedComments = day.comments;
    $scope.editingComments = true;
  };

  $scope.confirmComments = function(){
    day.comments = $scope.editedComments;
    daysSvc.update(day)
    .then($state.reload);
  };

  $scope.cancelComments = function(){
    $scope.editingComments = false;
  }

  $scope.nextDay = function(){
    $state.go('day', {date: localDate.nextDay().asStr});
  };

  $scope.prevDay = function(){
    $state.go('day', {date: localDate.prevDay().asStr});
  };

  $scope.confirmOuting = function(defaultOutingId){
    outingsSvc.confirmOuting(day.date, defaultOutingId)
      .then(function(){
        $state.reload()
      })
  };

  $scope.dismissDefaultOuting = function(defaultOutingId){
    outingsSvc.dismissDefault(day.date, defaultOutingId)
      .then(function(){
        $state.reload()
      })
  }

}]);


angular.module('saddle')
.run(['$rootScope', '$state', 'localDates', function($rootScope, $state, localDates) {


}]);
