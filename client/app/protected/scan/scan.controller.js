(function () {
    angular
        .module("SEO")
        .controller("ScanCtrl", ScanCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    ScanCtrl.$inject = ["$http", "DataService"];

    // Scan function declaration
    function ScanCtrl($http, DataService) {
        
        var vm = this;

        vm.domainURL = "";

        vm.startScan = startScan;
        vm.retrieveAll = retrieveAll;

        function startScan() {
            console.log("scanctrl");
            return $http({
                method: 'POST',
                url: 'api/scan/',
                data: {domain: vm.domainURL}
            })
        }

        function retrieveAll() {
            console.log("scanned data");
            DataService
                .retrieveAll()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.result = data;
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }
    }
})();