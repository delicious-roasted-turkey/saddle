angular.module('saddle')
.filter('saddleLongDate', [
'$filter',
'localDates',
function($filter, localDates) {
  return function(input) {
    if((typeof input) === 'string'){
      input = localDates.fromIso8601(input);
    }
    var amDateFormat = $filter('amDateFormat'); // filter provided by angular-moment
    return amDateFormat(input.moment, 'dddd') + " " + amDateFormat(input.moment, 'll');
  };
}]);
