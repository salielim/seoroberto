(function () {
  angular.module("SEO").controller("MenuCtrl", MenuCtrl);

  MenuCtrl.$inject = ["$http", "$q", "$rootScope", "$location", "DataService"];

  function MenuCtrl($http, $q, $rootScope, $location, DataService) {
    var vm = this;

    vm.domainURL = "";
    vm.startScan = startScan;
    vm.logout = logout;

    function startScan() {
      return $http({
        method: "POST",
        url: "api/scan/",
        data: { domain: vm.domainURL }
      })
        .catch(function (err) {
          console.log(err);
        });
    }

    function logout (user) {
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
