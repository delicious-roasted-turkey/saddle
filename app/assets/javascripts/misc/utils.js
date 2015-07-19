/**
 * Created by andreu on 7/19/15.
 */
;(function(){
  angular.module("saddle")
    .factory("utils", [
      "$q",
      function($q) {

        function promised(data, timeout){
          timeout = timeout || 1000;
          var def = $q.defer();
          setTimeout(function(){
            def.resolve(data);
          }, timeout);
          return def.promise;
        }

        return {
          promised: promised
        }
      }
    ])
}());