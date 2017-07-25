(function () {
    angular
        .module("DMS")
        .controller("DataCtrl", DataCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    DataCtrl.$inject = ["$http", "DataService"];

    // Scan function declaration
    function DataCtrl($http, DataService) {
        
        var vm = this;

        vm.domainURL = "";

        // vm.date = "";
        // vm.url = "";
        // vm.title = "";
        // vm.metaDescription = "";
        // vm.h1 = "";
        // vm.h2 = "";

        vm.retrieveAll = retrieveAll;
        vm.result = [];

        function retrieveAll() {
            console.log("* DataCtrl: retrieveAll");
            DataService
                .retrieveAll()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.result = data;
                    // vm.result.sort(CommonService.sortCusine);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                    // console.log("Controller Error 2:", JSON.stringify(err));
                });
        }
    }
})();