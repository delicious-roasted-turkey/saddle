angular.module("saddle")
.controller("DefaultOutingFormCtrl", [
  "$scope",
  "$state",
  "crudType",
  "defaultOuting",
  "defaultOutingsSvc",
  "dateUtils",
  function($scope, $state, crudType, defaultOuting, defaultOutingsSvc, dateUtils){

    $scope.defaultOuting = defaultOuting;

    $scope.dateControlsFrom = new DateControls(defaultOuting.from);
    $scope.dateControlsTo = new DateControls(defaultOuting.to);

    function DateControls(dateStr){
      this.radio = (dateStr ? 'date' : 'always');
      this.val = (dateStr ? new Date(dateStr) : new Date());
      this.datePopupIsOpen = false;

      this.openDatePopup = function() {
        this.datePopupIsOpen = true;
      };

      this.getIso = function(){
        return dateUtils.isoDate(dateUtils.localTimeUTC(this.val));
      }
    }


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    var saveAction = {
      'CREATE': defaultOutingsSvc.create,
      'EDIT': defaultOutingsSvc.update
    }[crudType];

    $scope.submit = function(){
      $scope.atmpSubmit = true;
      if($scope.new_defout_form.$valid) {

        if($scope.dateControlsFrom.radio === 'date') {
          defaultOuting.from = $scope.dateControlsFrom.getIso();
        } else {
          defaultOuting.from = null;
        }

        if($scope.dateControlsTo.radio === 'date') {
          defaultOuting.to = $scope.dateControlsTo.getIso();
        } else {
          defaultOuting.to = null;
        }

        saveAction($scope.defaultOuting)
          .then(function () {
            $state.go("defaultOutings-list");
          });
      }
    }

}]);