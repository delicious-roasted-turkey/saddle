describe("Outings service", function(){

  var svc;

  beforeEach(function(){
    module('saddle');
    inject(function(outingsSvc){
      svc = outingsSvc;
    });
  })

  describe("creating", function(){

    it("responds", function(){
      expect(typeof svc.create).toBe('function')
    });

  });
});