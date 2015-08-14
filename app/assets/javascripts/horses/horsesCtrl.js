angular.module('saddle')
.controller('HorsesCtrl', [
  '$state',
  '$scope',
  'dateUtils',
  'horsesSvc',
  'horseCounts',
  'currentCount',
  function($state, $scope, dateUtils, horsesSvc, horseCounts, currentCount){

    $scope.horseCounts = horseCounts;
    $scope.currentCount = currentCount.count;
    $scope.formVisible = false;

    // Models for the form
    $scope.formVals = {};

    $scope.showForm = function(){
      // Set defaults
      $scope.formVals.numHorses = currentCount.count;
      $scope.formVals.date = new Date();
      $scope.formVals.time = new Date();
      $scope.formVals.newCountFrom = "now";
      $scope.formVisible = true;
    }

    $scope.cancelForm = function(){
      $scope.formVisible = false;
    }

    $scope.openDatePopup = function() {
        $scope.popupStatus.opened = true;
    };

    $scope.dateOptionSelected = function() {
      return ($scope.formVals.newCountFrom === 'date');
    }

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.popupStatus = {
      opened: false
    };

    $scope.submit = function(){
      var count = {};
      count.numHorses = $scope.formVals.numHorses;
      if($scope.formVals.newCountFrom === "date"){
        // User-defined date
        count.from = new Date(
          $scope.formVals.date.getFullYear(),
          $scope.formVals.date.getMonth(),
          $scope.formVals.date.getDate(),
          $scope.formVals.time.getHours(),
          $scope.formVals.time.getMinutes(),
          $scope.formVals.time.getSeconds()
        );
        count.from = dateUtils.localTimeUTC(count.from);
      } else {
        // Current date
        count.from = dateUtils.localTimeUTC();
      }
      horsesSvc.save(count)
        .then(function(){
          $state.reload()
        });
    }

    function getDateFromFrom(){
      var date;
      if($scope.formVals.newCountFrom === "date"){
        // User-defined date
        date = new Date(
          $scope.formVals.date.getFullYear(),
          $scope.formVals.date.getMonth(),
          $scope.formVals.date.getDate(),
          $scope.formVals.time.getHours(),
          $scope.formVals.time.getMinutes(),
          $scope.formVals.time.getSeconds()
        );
        date = dateUtils.localTimeUTC(date);
      } else {
        // Current date
        date = dateUtils.localTimeUTC();
      }
      return date;
    }

    $scope.deleteCount = function(id){
      horsesSvc.destroy(id)
      .then(function(){
          $state.reload()
      });
    }
  }
]);