angular.module('saddle')
.directive('saddleMoneyInput', [
  'currencySvc',
  'Big',
  function(currencySvc, Big){

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel){

        function formatter(modelValue) {
          var decimalVal = new Big(modelValue);
          return decimalVal.toFixed(2).toString();
        }

        ngModel.$formatters.push(formatter);

        // Set validity of input according to its content.
        var modelExpression = attrs.ngModel;
        scope.$watch(modelExpression, function(){
          if(currencySvc.parseCurrency(ngModel.$modelValue)){
            ngModel.$setValidity("currency", true);
          } else {
            ngModel.$setValidity("currency", false);
          }
        });

        // Convert value to standard form when leaving input
        elem.on('blur', function(){
          var validatedCurr = currencySvc.parseCurrency(ngModel.$modelValue);
          if(validatedCurr){
            ngModel.$setViewValue(validatedCurr);
            ngModel.$render();
          }
        });
      }
    }

  }]);

