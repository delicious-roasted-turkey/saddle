describe('Currency service', function(){

  var svc;

  beforeEach(function(){
    module('saddle')
    inject(function(currencySvc){
      svc = currencySvc;
    });
  });

  describe('Method for parsing currency', function(){

    it('should exist', function(){
      expect(typeof svc.parseCurrency).toBe('function')
    });

    it('should return null if the input is invalid', function(){
      var invalidData = [
        undefined,
        null,
        1234,
        'abc',
        '12:1',
        '32_10',
        '30 €'
      ]

      invalidData.forEach(function(val){
        expect(svc.parseCurrency(val)).toBe(null);
      })
    });

    it('should return a string representing the decimal value if the input is valid', function(){
      var validTimes = [
        ['40', '40.00'],
        ['40,2', '40.20'],
        ['.3', '0.30']
      ]

      validTimes.forEach(function(time){
        var input = time[0];
        var expectedOutput = time[1];
        expect(svc.parseCurrency(input)).toBe(expectedOutput);
      })
    });

  });
});
