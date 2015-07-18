angular.module("saddle")
.controller("RootCtrl", [
  "$scope",
  function($scope){

    // Define links to be seen on navbar
    function NavbarLink(state, text){
      this.state = state;
      this.text = text;
    }

    var navbarLinks = [
      new NavbarLink("schedule", "Reserves"),
      new NavbarLink("defaultOutings", "Excursions")
    ];

    $scope.navbarLinks = navbarLinks;
  }]);