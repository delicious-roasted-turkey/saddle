angular.module('saddle')
.controller('CalendarCtrl', [
'$scope',
'$state',
'$stateParams',
'localDates',
'daysSvc',
'uiCalendarConfig',
function($scope, $state, $stateParams, localDates, daysSvc, uiCalendarConfig){

  var date = $stateParams.date || localDates.today().asStr;

  $scope.calendarConfig = {
    defaultDate: date,
    header: 'false',
    timeFormat: 'HH:mm',
    lang: 'ca',

    // Customizes the appearance of event elements
    eventRender: function(event, element){
      element.find(".fc-time").before($("<span/>", {
        "class": "fc-freeplaces",
        text: "42"
      }));
      element.toggleClass('confirmed', event.confirmed);
    },

    // Fetches events from backend
    events: function(start, end, timezone, callback){
      var startStr = localDates.fromMoment(start).asStr;
      var endStr = localDates.fromMoment(end).asStr;
      daysSvc.range(startStr, endStr)
        .then(function(data){
          callback(outingsToEvents(data));
        });
    },

    // Handles click on day by going to day view
    dayClick: function(date) {
      $state.go('schedule', {date: date});
    },
    eventClick: function(event) {
      $state.go('schedule', {date: event.date});
    },

    viewRender: function(view, element) {
      $scope.date = view.intervalStart;
    }
  };

  $scope.nextMonth = function(){
    getCalendar().fullCalendar('next');
  }

  $scope.prevMonth = function(){
    getCalendar().fullCalendar('prev');
  }

  function getCalendar(){
    // The calendar is named in the template as "myCalendar".
    return uiCalendarConfig.calendars.myCalendar;
  }
  /**
   * Given an array of days, extracts their outings
   * and returns them as calendar events.
   * @param days
   */
  function outingsToEvents(days){
    var events = [];
    days.forEach(function(day){
      events = events.concat(day.outings.map(function(outing){
        var start = day.date + "T" + outing.time; // '2015-03-12T09:00'
        return {
          title: outing.name,
          start: start,
          confirmed: outing.confirmed,
          date: day.date
        }
      }));
    });
    return events;
  }

  $scope.calendarEvents = [];


}]);
