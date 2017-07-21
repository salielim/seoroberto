(function () {
    angular
        .module("DMS")
        .controller("ScanCtrl", ScanCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    ScanCtrl.$inject = [];

    // Scan function declaration
    function startScan() {
        var vm = this;

        vm.domainURL = "";
        vm.date = "";
        vm.url = "";
        vm.title = "";
        vm.metaDescription = "";
        vm.h1 = "";
        vm.h2 = "";

        console.log("scanning now");
    }
})();