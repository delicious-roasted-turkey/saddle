/**
 * Service "daysSvc"
 */
angular.module("saddle")
.factory("daysSvc", [
  "$resource",
  "reservationsBackupSvc",
  function days($resource, reservationsBackupSvc){

    var resource = $resource('/days/:date.json', {date:'@day.date'}, {
      update: { method: 'PUT' },
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

    function update(day){
      return resource.update({ day: day }).$promise
        .then(reservationsBackupSvc.writeBackupFile);
    }

    return {
      byDate: byDate,
      range: range,
      update: update
    }
  }
]);
