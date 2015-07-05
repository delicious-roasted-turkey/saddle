;(function() {
  /**
   * Represents a date that does not correspond to a specific
   * moment in time.
   */
  function LocalTime(iso8601str) {

    //var parts = iso8601str.split(":");

    //var hours = parseInt(parts[0], 10);
    //var minutes = parseInt(parts[0], 10);

    this.asStr = iso8601str;
  }

  function get(str) {
    return new LocalTime(str);
  }

  function localTimes(){
    return {
      get: get
    }
  };

  // Register as service
  angular.module("saddle")
    .factory("localTimes", localTimes);
}());

