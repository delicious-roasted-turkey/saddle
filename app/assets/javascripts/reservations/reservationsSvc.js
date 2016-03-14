angular.module('saddle')
.factory('reservationsSvc', [
'$resource',
'reservationsBackupSvc',
function($resource, reservationsBackupSvc){

  var resource = $resource('/reservations/:id.json', {id:'@reservation.id'}, {
    update: { method: 'PUT' },
    getOfOutings : {
      method: 'GET',
      url: '/reservations/by_outings.json',
      isArray : true
    }
  });

  function getNew(outing){

    var reservation = {};

    reservation.outingId = outing.id;
    reservation.priceAdult = outing.priceAdult;
    reservation.priceChild = outing.priceChild;
    reservation.numAdults = 0;
    reservation.numChildren = 0;

    return reservation;
  }

  return {
    create: function(reservation){
      return resource.save({ reservation: reservation }).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },
    update: function(reservation){
      return resource.update({ reservation: reservation }).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },
    get: function(id){
      return resource.get({id: id}).$promise;
    },
    getOfOutings: function(outingIds){
      return resource.getOfOutings({"outing_ids" : JSON.stringify(outingIds)}).$promise;
    },
    destroy: function(id){
      return resource.delete({id: id}).$promise
            .then(reservationsBackupSvc.writeBackupFile);
    },

    getNew: getNew
  }
}]);
