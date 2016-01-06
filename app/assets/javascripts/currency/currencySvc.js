angular.module('saddle')
  .factory('currencySvc', function(){

    function parseCurrency(val) {

      if ((typeof val) !== 'string') {
        return null;
      }

      val = val.replace(/[,]/, ".");
      val = val.replace(/[ ]/, "");

      if (!/^[-]?[0-9]*[.]?[0-9]*$/.test(val)){
        return null;
      }

      var tokens = val.split(".");
      var integerPart, decimalPart;
      if(tokens.length > 1){
        integerPart = tokens.slice(0, tokens.length-1);
        decimalPart = tokens[tokens.length-1];
      } else {
        integerPart = tokens;
        decimalPart = "";
      }

      integerPart = integerPart.join("");

      integerPart = padZerosRight(integerPart, "1");
      decimalPart = padZerosRight(decimalPart, "2");

      return integerPart + "." + decimalPart;
    }

    function padZerosRight(str, size) {
      while (str.length < size) str =  str + "0";
      return str;
    }

    return {
      parseCurrency: parseCurrency
    };
  })
