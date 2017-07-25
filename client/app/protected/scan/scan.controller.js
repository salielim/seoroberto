(function () {
    angular
        .module("DMS")
        .controller("ScanCtrl", ScanCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    ScanCtrl.$inject = ["$http"];

    // Scan function declaration
    function ScanCtrl($http) {
        
        var vm = this;

        vm.domainURL = "";

        vm.startScan = startScan;

        function startScan() {
            console.log("scanctrl");
            return $http({
                method: 'POST',
                url: 'api/scan/',
                data: {domain: vm.domainURL}
            })
        }
    }
})();