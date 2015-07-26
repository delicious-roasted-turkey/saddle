angular.module('saddle')
.directive('saddleValidateTime', [
  'timeSvc',
  function(timeSvc){

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, modelCtrl){

        // Set validity of input according to its content.
        var modelExpression = attrs.ngModel;
        scope.$watch(modelExpression, function(){
          if(timeSvc.parseLocalTime(modelCtrl.$modelValue)){
            modelCtrl.$setValidity("localTime", true);
          } else {
            modelCtrl.$setValidity("localTime", false);
          }
        });

        // Convert value to standard form when leaving input
        elem.on('blur', function(){
          var validatedTime = timeSvc.parseLocalTime(modelCtrl.$modelValue);
          if(validatedTime){
            modelCtrl.$setViewValue(validatedTime);
            modelCtrl.$render();
          }
        });
      }
    }
  }]);

