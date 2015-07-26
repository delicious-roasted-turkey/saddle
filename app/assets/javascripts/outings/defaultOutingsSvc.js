;(function(){
  angular.module("saddle")
  .factory("defaultOutingsSvc", [
    '$resource',
    function($resource){

      var resource = $resource('/default_outings/:id');

      function getAll(){
        return resource.query().$promise;
      }

      function create(defOuting){
        return resource.save({
          defaultOuting: defOuting
        }).$promise;
      }

      function get(id){
        return resource.get({id: id}).$promise;
      }

      function destroy(id){
        return resource.delete({id: id}).$promise;
      }

      return {
        getAll: getAll,
        create: create,
        get: get,
        destroy: destroy
      }
  }])
}());
