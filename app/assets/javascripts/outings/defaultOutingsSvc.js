;(function(){
  angular.module("saddle")
  .factory("defaultOutingsSvc", [
    '$resource',
    "utils",
    function($resource, utils){

      var resource = $resource('/default_outings');

      /**
       * Returns all default outings.
       */
      function getAll(){
        return resource.query().$promise;
      }

      return {
        getAll: getAll
      }
  }])
}());
