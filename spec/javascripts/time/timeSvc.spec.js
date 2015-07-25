describe('Time service', function(){

  var svc;

  beforeEach(function(){
    module('saddle')
    inject(function(timeSvc){
      svc = timeSvc;
    });
  });

  describe('Method for parsing local time strings', function(){

    it('should exist', function(){
      expect(typeof svc.parseLocalTime).toBe('function')
    });

    it('should return null if the time is invalid', function(){
      var invalidTimes = [
        undefined,
        null,
        1234,
        '',
        '12:1',
        '32:10',
        '12:60',
        '123:30',
        '8a321',
        '8a3'
      ]

      invalidTimes.forEach(function(time){
        expect(svc.parseLocalTime(time)).toBe(null);
      })
    });

    it('should return the time in standard format if the time input is valid', function(){
      var validTimes = [
        ['12:30', '12:30'],
        ['2:30', '02:30'],
        ['2 30', '02:30'],
        ['230', '02:30'],
        ['1230', '12:30'],
        ['0000', '00:00'],
        ['8', '08:00'],
        ['8a32', '08:32']
      ]

      validTimes.forEach(function(time){
        var input = time[0];
        var expectedOutput = time[1];
        expect(svc.parseLocalTime(input)).toBe(expectedOutput);
      })
    });

  });
});