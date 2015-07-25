angular.module('saddle')
.controller('DeleteDefaultOutingCtrl', [
   '$scope',
   '$state',
   'defaultOutingsSvc',
   'defaultOuting',
    function($scope, $state, defaultOutingsSvc, defaultOuting){

      $scope.defaultOuting = defaultOuting;

      $scope.submit = function(){
        defaultOutingsSvc.destroy(defaultOuting.id)
          .finally(function(){
            $state.go("defaultOutings-list");
          })
      }

    }
  ])