angular.module('saddle')
.factory('outingsSvc', [
'$resource',
'reservationsBackupSvc',
function($resource, reservationsBackupSvc){

  var resource = $resource('/outings/:id.json', {id:'@outing.id'}, {
    update: { method: 'PUT' },
    confirm: {
      url: '/outings/confirm',
      method: 'POST'
    },
    dismissDefault: {
      url: '/outings/dismiss_default',
      method: 'POST'
    }
  });

  function getNew(date){
    var outing = {};
    outing.day = {};
    outing.day.date = date;
    return outing;
  }

  function confirmOuting(date, defaultOutingId){
    return resource.confirm({ date:date, defaultOutingId: defaultOutingId }).$promise
          .then(reservationsBackupSvc.writeBackupFile);
  }

  function dismissDefault(date, defaultOutingId){
    return resource.dismissDefault({ date:date, defaultOutingId: defaultOutingId }).$promise
  }

  return {
    create: function(outing){
      return resource.save({ outing: outing }).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },
    update: function(outing){
      return resource.update({ outing: outing }).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },
    get: function(id){
      return resource.get({id: id}).$promise;
    },
    destroy: function(id){
      return resource.delete({id: id}).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },

    getNew: getNew,
    confirmOuting: confirmOuting,
    dismissDefault: dismissDefault
  }
}]);
