angular.module("saddle")
.controller("HomeCtrl", [
  "$scope",
  "$rootScope",
  "$state",
  "sessionsSvc",
  function($scope, $rootScope, $state, sessionsSvc){

    // Define links to be seen on navbar
    function NavbarLink(state, text, iconClasses){
      this.state = state;
      this.text = text;
      this.iconClasses = iconClasses || "";
      this.enabledWhenMovingRsv = true;
    }

    var navbarLinks = [];
    (function(){

      var rsvLink = new NavbarLink("reservations", "Reserves", "fa-book");

      var horsesLink = new NavbarLink("horses", "Cavalls", "saddlefont-horseshoe");
      horsesLink.enabledWhenMovingRsv = false;

      var defOutLink = new NavbarLink("defaultOutings", "Excursions predefinides", "saddlefont-directions");
      defOutLink.enabledWhenMovingRsv = false;

      navbarLinks.push(rsvLink);
      navbarLinks.push(horsesLink);
      navbarLinks.push(defOutLink);

    }());


    $scope.menuHidden = true;
    $scope.toggleMenu = function(){
      $scope.menuHidden = !$scope.menuHidden;
    }
    $scope.hideMenu = function(){
      $scope.menuHidden = true;
    }

    $scope.signOut = function(){
      sessionsSvc.signOutAndRedirectToLogin();
    }

    /**
     * Transitions to previous state
     */
    function goBack(){
      $state.go($scope.$previousState, $scope.$previousStateParams);
    }

    $scope.navbarLinks = navbarLinks;
    $scope.goBack = goBack;

  }]);