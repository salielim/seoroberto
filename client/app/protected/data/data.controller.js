(function () {
    angular
        .module("SEO")
        .controller("DataCtrl", DataCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    DataCtrl.$inject = ["$http", "DataService", "NgTableParams", "$filter"];

    // Scan function declaration
    function DataCtrl($http, DataService, NgTableParams, $filter) {

        var vm = this;

        vm.domainURL = "";

        vm.retrieveAll = retrieveAll;
        vm.result = [];

        vm.tableParams = new NgTableParams({
            page: 1,
            count: 5
        }, {
                total: vm.result.length,
                getData: function (params) {
                    retrieveAll();

                    // Sorting
                    vm.data = params.sorting() ? $filter('orderBy')(vm.result, params.orderBy()) : vm.result;
                    
                    // Pagination
                    vm.data = vm.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    // $defer.resolve(vm.data);
                }
            });

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