describe("Default outings service", function(){

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

  it("responds to create()", function(){
    expect(typeof svc.create).toBe('function')
  });
});