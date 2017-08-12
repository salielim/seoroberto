(function () {
  angular.module("SEO").controller("MenuCtrl", MenuCtrl);

  MenuCtrl.$inject = ["$http", "DataService"];

  function MenuCtrl($http, DataService) {
    var vm = this;

    vm.domainURL = "";
    vm.startScan = startScan;

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
  }
})();
