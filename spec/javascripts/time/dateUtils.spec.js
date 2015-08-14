describe('Date utils', function(){

  var svc;

  beforeEach(function(){
    module('saddle')
    inject(function(dateUtils){
      svc = dateUtils;
    });
  });

  describe('Getting UTC date with same datetime as local time', function(){

    it('should exist', function(){
      expect(typeof svc.localTimeUTC).toBe('function')
    });

    it('should return a date whose difference with the current date' +
    ' equals the offset of the current timezone', function(){

      var now = new Date();
      var tested = svc.localTimeUTC();

      var nowTimestampSeconds = now.getTime() / 1000;
      var testedTimestampSeconds = tested.unix();
      var diffSeconds = nowTimestampSeconds - testedTimestampSeconds;

      var timezoneOffsetSeconds = now.getTimezoneOffset() * 60;
      // Allow for some imprecision
      expect(Math.abs(timezoneOffsetSeconds - diffSeconds)).toBeLessThan(10);
    });

  });
});