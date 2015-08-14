angular.module('saddle')
.factory('horsesSvc', [
'$resource',
function($resource){

  var resource = $resource('/available_horse_counts/:id.json', {}, {
    currentCount: {
      url: '/available_horse_counts/current_count.json',
      method: 'GET'
    }
  });

  function getAll(){
    return resource.query().$promise;
  }

  function currentCount(){
    return resource.currentCount().$promise;
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