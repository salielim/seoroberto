(function () {
    angular
        .module("SEO")
        .controller("DataCtrl", DataCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    DataCtrl.$inject = ["$http", "DataService", "NgTableParams"];

    // Scan function declaration
    function DataCtrl($http, DataService, NgTableParams) {
        
        var vm = this;

        vm.domainURL = "";

        vm.retrieveAll = retrieveAll;
        vm.result = [];

        vm.tableParams = new NgTableParams({
                page: 1,
                count: 5
            }, { dataset: vm.result});


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