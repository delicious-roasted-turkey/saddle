;(function(){
  angular.module("saddle")
  .factory("defaultOutings", [
    "utils",
    function(utils){

      /**
       * Returns all default outings.
       */
      function getAll(){
        return utils.promised([
          {
            name: "Fustam",
            time: "09:00"
          },{
            name: "Mitjana",
            time: "12:00"
          }
        ]);
      }

      return {
        getAll: getAll
      }
  }])
}());