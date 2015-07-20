describe("Default outings controller", function(){

  var svc;

  beforeEach(function(){
    module('saddle');
    inject(function(defaultOutingsSvc){
      svc = defaultOutingsSvc;
    });
  })

  it("responds to getAll()", function(){
    expect(typeof svc.getAll).toBe('function')
  });

});