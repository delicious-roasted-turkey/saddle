;(function(){
  angular.module("saddle")
  .factory("defaultOutingsSvc", [
    '$resource',
    function($resource){

      var resource = $resource('/default_outings/:id.json', {id:'@defaultOuting.id'}, {
        update: { method: 'PUT' }
      });

      function getAll(){
        return resource.query().$promise;
      }

      function create(defOuting){
        return resource.save({
          defaultOuting: defOuting
        }).$promise;
      }

      function update(defOuting){
        return resource.update({ defaultOuting: defOuting }).$promise;
      }

      function get(id){
        return resource.get({id: id}).$promise;
      }

      function destroy(id){
        return resource.delete({id: id}).$promise;
      }

      function getNew(date) {
        return {
          time : undefined,
          name : '',
          priceAdult : '0.00',
          priceChild : '0.00'
        }

        var outing = {};

        outing.day = {};
        outing.day.date = date;
        return outing;
      }

      return {
        getAll: getAll,
        create: create,
        update: update,
        get: get,
        destroy: destroy,
        getNew : getNew
      }
  }])
}());
