/**
 * Thin service for exposing the big.js library
 */
angular.module('saddle')
.factory('Big', function($window) {
  return $window.Big;
});
