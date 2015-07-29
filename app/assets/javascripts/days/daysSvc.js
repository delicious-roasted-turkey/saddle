/**
 * Service "daysSvc"
 */
angular.module("saddle")
.factory("daysSvc", [
  "$resource",
  function days($resource){

    var resource = $resource('/days/:date.json');

    /**
     * Returns the day that corresponds with the given
     * date.
     */
    function byDate(localDate){
      if((typeof localDate) !== 'string'){
        localDate = localDate.asStr;
      }
      return resource.get({date: localDate}).$promise;
    }

    return {
      byDate: byDate
    }
  }
]);
