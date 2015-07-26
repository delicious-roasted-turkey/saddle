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
        $state.go("schedule", {date: $scope.outing.day.date});
      });
    }
  }
}]);

// Stub
angular.module('saddle')
.factory('outingsSvc', ['$resource', function($resource){

    var resource = $resource('/outings/:id', {id:'@outing.id'}, {
      update: { method: 'PUT' }
    });

    function getNew(date){
      var outing = {};
      outing.day = {};
      outing.day.date = date;
      return outing;
    }

    return {
      create: function(outing){
        return resource.save({ outing: outing }).$promise;
      },
      update: function(outing){
        return resource.update({ outing: outing }).$promise;
      },
      get: function(id){
        return resource.get({id: id}).$promise;
      },
      destroy: function(id){
        return resource.delete({id: id}).$promise;
      },

      getNew: getNew
    }
}]);