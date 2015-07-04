// Register as service
angular.module("saddle")
.factory("LocalDate", function(){

  /**
   * Represents a date that does not correspond to a specific
   * moment in time.
   */
  var constr = function(iso8601str){

    var _moment = moment(iso8601str).startOf("day");

    function nextDay(){
      return add(1, "day");
    }

    function prevDay(){
      return add(-1, "day");
    }

    /**
     * NOTE: this function has a similar signature
     * than moment.add. However, this function returns
     * a new instance (LocalDate is immutable) while
     * momentjs is mutable.
     */
    function add(amount, unit){
      var m = _moment.clone();
      m.add(amount, unit);
      return fromMoment(m);
    }

    return {
      moment: _moment
      ,nextDay : nextDay
      ,prevDay : prevDay
    };
  };

  function today(){
    return fromMoment(moment());
  }

  function fromMoment(moment){
    return new constr(moment.format("YYYY-MM-DD"));
  }

  function fromIso8601(str){
    return new constr(str);
  }

  return {
    today: today,
    fromIso8601: fromIso8601
  }
});
