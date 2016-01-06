angular.module('saddle')
.factory('reservationsSvc', [
'$resource',
function($resource){

  var resource = $resource('/reservations/:id.json', {id:'@reservation.id'}, {
    update: { method: 'PUT' }
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
      return resource.save({ reservation: reservation }).$promise;
    },
    update: function(reservation){
      return resource.update({ reservation: reservation }).$promise;
    },
    get: function(id){
      return resource.get({id: id}).$promise;
    },
    destroy: function(id){
      return resource.delete({id: id}).$promise;
    },

    getNew: getNew
  }
}]);
