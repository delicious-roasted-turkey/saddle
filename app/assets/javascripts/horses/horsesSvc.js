angular.module('saddle')
.factory('horsesSvc', [
'$resource',
'dateUtils',
function($resource, dateUtils){

  var resource = $resource('/available_horse_counts/:id.json', {}, {
    countAt: {
      url: '/available_horse_counts/count_at.json',
      method: 'GET'
    }
  });

  function getAll(){
    return resource.query().$promise;
  }

  function currentCount(){
    return resource.countAt({
      date: function(){
        return dateUtils.localTimeUTC();
      }
    }).$promise;
  }

  function destroy(id){
    return resource.delete({id: id}).$promise;
  }

  function save(count){
    return resource.save({availableHorseCount: count}).$promise;
  }

  return {
    getAll: getAll,
    currentCount: currentCount,
    destroy: destroy,
    save: save
  }

}
]);