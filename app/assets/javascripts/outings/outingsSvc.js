angular.module('saddle')
.factory('outingsSvc', ['$resource', function($resource){

  var resource = $resource('/outings/:id.json', {id:'@outing.id'}, {
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
