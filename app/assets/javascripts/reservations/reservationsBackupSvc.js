angular.module('saddle')
.factory('reservationsBackupSvc', [
'$resource',
'electronSvc',
'localDates',
function($resource, electronSvc, localDates){

  var resource = $resource('/backup_file.json', {}, {
    getText : {
      url: '/backup_file/:date/get_json.json',
      method: 'GET'
    }
  });

  function writeBackupFile(){
    svc.getText()
    .then(function(data){
      var fs = electronSvc.require('fs');
      var os = electronSvc.require('os');
      var text = data.text;
      text = text.replace(/\n/g, os.EOL);

      // Add header
      var header = "Fitxer generat a " + new Date().toLocaleString('ca') + os.EOL + os.EOL;
      text = header + text;

      fs.writeFile("reserves_auto.txt", text);
    });
  }

  function getText(){
    var date = localDates.today();
    var dateStr = date.asStr;
    return resource.getText({date : dateStr}).$promise;
  }

  var svc =  {
    writeBackupFile : writeBackupFile,
    getText : getText
  };

  function noOp(){
    console.log("Not in electron app");
  }

  /**
   * Disable all functions if the app is not being used from ElectronJs
   */
  if(!electronSvc.isElectronApp()) {
    Object.getOwnPropertyNames(svc).forEach(function(propName){
      svc[propName] = noOp;
    });
  }

  return svc;

}
]);