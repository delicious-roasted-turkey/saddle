angular.module('saddle')
.factory('electronSvc', function(){

  function isElectronApp(){
    return !!(window.nodeRequire);
  }

  return {
    isElectronApp : isElectronApp,
    require : window.nodeRequire
  }

});
