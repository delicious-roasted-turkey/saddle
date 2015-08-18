angular.module('saddle')
  .factory('sessionsSvc', [
    '$resource',
    function($resource){

      var resource = $resource('', {}, {
        signOut: {
          url: '/users/sign_out.json',
          method: 'DELETE'
        }
      });

      function signOut(){
        return resource.signOut().$promise;
      }

      function signOutAndRedirectToLogin(){
        signOut()
          .then(function() {
            window.location.href = "/";
          });
      }

      return {
        signOut: signOut,
        signOutAndRedirectToLogin: signOutAndRedirectToLogin
      }

    }
  ]);
