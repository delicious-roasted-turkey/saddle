angular.module('saddle')
.factory('timeSvc', function(){

    /**
     * Parses a string and tries to recognize a local time.
     * If a local time is recognized, is returned as a string
     * inf 'HH:mm' format. Otherwise null is returned.
     */
    function parseLocalTime(time){


      if((typeof time) !== 'string'){
        return null;
      }

      // Get all groups of digits
      var matches = time.match(/\d+/g);
      if(matches === null){
        return null;
      }

      // There must be either one group of 1-4 digits
      // or two groups of 1-2 and 2 digits respectively
      var hours, minutes;
      var m0 = matches[0];
      var m1 = matches[1];
      var m2 = matches[2];
      if ((m0.length <= 4) && !m1){
        if(m0.length > 2) {
          // Asume the last two digits are the minutes
          hours = m0.substring(0, m0.length - 2);
          minutes = m0.substring(m0.length - 2);
        } else {
          // No minutes
          hours = m0;
          minutes = "00";
        }
      } else if ((m0.length <= 2) && (m1.length == 2) && !m2){
        hours = m0;
        minutes = m1;
      } else {
        return null;
      }

      // Check that the numbers are within valid range
      var iHours = parseInt(hours, 10);
      var iMinutes = parseInt(minutes, 10);
      if((iHours > 23 || iMinutes > 59)){
        return null;
      }

      // Time is valid. Return in standard format
      return pad(iHours, 2) + ":" + pad(iMinutes, 2);
    }

    function pad(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    return {
      parseLocalTime: parseLocalTime
    };
  })
