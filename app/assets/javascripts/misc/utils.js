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

  function ListMap(){

    var inner = {};

    this.put = function(key, val){
      inner[key] = inner[key] || [];
      inner[key].push(val);
    }

    this.get = function(key){
      return inner[key] || [];
    }

  }

  return {
    promised: promised,
    ListMap : ListMap
  }
}
]);
