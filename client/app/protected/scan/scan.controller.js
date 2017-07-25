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
        
        // vm.date = "";
        // vm.url = "";
        // vm.title = "";
        // vm.metaDescription = "";
        // vm.h1 = "";
        // vm.h2 = "";

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