angular.module('saddle')
.factory('fileSvc', [
'electronSvc',
function(ectn){

  var fs;

  if(ectn.isElectronApp()){
    fs = ectn.require('fs');
  }

  function writeFileTest(){

    if(ectn.isElectronApp()){
      fs.writeFile("/tmp/test", "foo! Foo!", function(err){
        if(err) {
          return console.log(err);
        }

        console.log("The file was saved");
      })
    } else {
      console.log("Cannot write file: not in electron environment")
    }


  }

  return {
    writeFileTest : writeFileTest
  }

}]);
