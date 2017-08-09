(function() {
  angular.module("SEO").controller("IndexCtrl", IndexCtrl);

  IndexCtrl.$inject = ["$http", "$q", "$rootScope", "$location", "AuthService"];

  function IndexCtrl($http, $q, $rootScope, $location, AuthService) {
    var vm = this;

    vm.logout = function(user) {
      return $http
        .post("/logout")
        .then(function(user) {
          $rootScope.currentUser = null;
          $location.url("/");
        })
        .catch(function() {
          console.log(err);
        });
    };
  }
})();
