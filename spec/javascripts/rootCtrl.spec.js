describe("Root Controller", function(){

  var $controller;
  beforeEach(module("saddle"));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it("should provide info about links to be painted in the menu", function(){
    var $scope = {};
    $controller("RootCtrl", { $scope: $scope });
    expect($scope.navbarLinks).toBeDefined();
  })

});