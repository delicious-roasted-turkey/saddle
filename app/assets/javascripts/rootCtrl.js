angular.module("saddle")
.controller("RootCtrl", [
  "$scope",
  "$state",
  function($scope, $state){

    // Define links to be seen on navbar
    function NavbarLink(state, text){
      this.state = state;
      this.text = text;
    }

    var navbarLinks = [
      new NavbarLink("calendar", "Reserves"),
      //new NavbarLink("schedule", "Reserves"),
      new NavbarLink("defaultOutings", "Excursions"),
      new NavbarLink("horses", "Cavalls")
    ];

    /**
     * Transitions to previous state
     */
    function goBack(){
      $state.go($scope.$previousState, $scope.$previousStateParams);
    }

    $scope.navbarLinks = navbarLinks;
    $scope.goBack = goBack;

  }]);