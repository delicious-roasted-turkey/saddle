describe("Root Controller", function(){

  var $controller;
  beforeEach(module("saddle"));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it("foo", function(){
    expect(1).toBe(1)
  })

});