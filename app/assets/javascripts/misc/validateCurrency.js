angular.module('saddle')
.directive('saddleValidateCurrency', [
  'currencySvc',
  function(currencySvc){

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, modelCtrl){

        // Set validity of input according to its content.
        var modelExpression = attrs.ngModel;
        scope.$watch(modelExpression, function(){
          if(currencySvc.parseCurrency(modelCtrl.$modelValue)){
            modelCtrl.$setValidity("currency", true);
          } else {
            modelCtrl.$setValidity("currency", false);
          }
        });

        // Convert value to standard form when leaving input
        elem.on('blur', function(){
          var validatedCurr = currencySvc.parseCurrency(modelCtrl.$modelValue);
          if(validatedCurr){
            modelCtrl.$setViewValue(validatedCurr);
            modelCtrl.$render();
          }
        });
      }
    }

  }]);

