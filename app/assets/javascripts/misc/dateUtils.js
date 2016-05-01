angular.module('saddle')
.factory('dateUtils', function(){

    /**
     * Return a date whose time, in UTC, is the same as the local time
     * of the specified date (or now if no date is provided).
     * For example, if my timezone is GMT+2 and local time is 16:00,
     * localTimeUTC() will return 16:00 UTC (which is actually two hours
     * later than now):
     */
    function localTimeUTC(momentOrDate){

      if(!momentOrDate) return localTimeUTC(moment());

      momentOrDate = moment(momentOrDate);

      var result = moment().utc();
      result.year(momentOrDate.year());
      result.month(momentOrDate.month());
      result.date(momentOrDate.date());
      result.hour(momentOrDate.hour());
      result.minute(momentOrDate.minute());
      return result;
    }

    function isoDate(date) {

      console.log(date)

      if(moment.isMoment(date)){
        date = date.toDate();
      }

      function pad(number) {
        var r = String(number);
        if (r.length === 1) {
          r = '0' + r;
        }
        return r;
      }

      return date.getUTCFullYear()
        + '-' + pad(date.getUTCMonth() + 1)
        + '-' + pad(date.getUTCDate());

    }

    return {
      localTimeUTC: localTimeUTC,
      isoDate : isoDate
    }
  })