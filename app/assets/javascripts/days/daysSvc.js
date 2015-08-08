/**
 * Service "daysSvc"
 */
angular.module("saddle")
.factory("daysSvc", [
  "$resource",
  function days($resource){

    var resource = $resource('/days/:date.json', {}, {
      range: {
        url: '/days/range.json',
        method: 'GET',
        isArray: true
      }
    });

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

    function range(start, end){
      return resource.range({start: start, end: end}).$promise;
    }

    return {
      byDate: byDate,
      range: range
    }
  }
]);
