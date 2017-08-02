(function () {
    angular
        .module("SEO")
        .controller("ScanCtrl", ScanCtrl);

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    ScanCtrl.$inject = ["$http", "DataService", "$filter"];

    // Scan function declaration
    function ScanCtrl($http, DataService, $filter) {

        var vm = this;

        vm.domainURL = "";

        vm.startScan = startScan;
        vm.retrieveScanned = retrieveScanned;
        vm.showTable = showTable;
        vm.result = [];

        function startScan() {
            console.log("scanctrl");
            return $http({
                method: 'POST',
                url: 'api/scan/',
                data: { domain: vm.domainURL }
            })
        }

    function showTable() {
        console.log("in showTable")
        DataService
            .retrieveScanned()
            .then(function (data) {
                vm.data = data;
                console.log(vm.data);
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 3
                }, {
                        total: vm.data.length,
                        getData: function (params) {
                            retrieveScanned();

                            // Sorting
                            vm.data = params.sorting() ? $filter('orderBy')(vm.data, params.orderBy()) : vm.data;

                            // Filtering
                            vm.data = params.filter() ? $filter('filter')(vm.data, params.filter()) : vm.data;

                            // Pagination
                            vm.data = vm.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            // $defer.resolve(vm.data);                        
                        }
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

        function retrieveScanned() {
            console.log("scanned data");
            DataService
                .retrieveScanned()
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