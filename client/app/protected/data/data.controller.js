(function () {
    angular
        .module("SEO")
        .controller("DataCtrl", DataCtrl)

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    DataCtrl.$inject = ["$http", "DataService", "$filter"];

    // Scan function declaration
    function DataCtrl($http, DataService, $filter) {

        var vm = this;
        vm.domainURL = "";
        // vm.data = [];
        vm.retrieveAll = retrieveAll;

        retrieveAll()
        function retrieveAll() {
            console.log("* DataCtrl: retrieveAll");
            DataService
                .retrieveAll()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    // vm.result = data;
                    vm.rowList = data;
                    vm.displayedCollection = [].concat(vm.rowList);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }
    }
})();