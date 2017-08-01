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

        vm.cols = [
            { field: "created_at", show: true },
            { field: "domain_name", show: true },
            { field: "url", show: true },
            { field: "meta_robots", show: true },
            { field: "title", show: true },
            { field: "meta_desc", show: true },
            { field: "og_title", show: true },
            { field: "og_desc", show: true }
        ];

        vm.metaRobotsList = [{id: "index,follow", title: "index,follow"}, {id: 'noindex,follow', title: 'noindex,follow'}];

        vm.result.forEach(function (item) {
            if (inArray(item.meta_robots, arr) === -1) {
                arr.push(item.meta_robots);
                metaRobotsList.push({
                    'id': item.meta_robots,
                    'title': item.meta_robots
                });
                console.log(vm.metaRobotsList);
            }
        });

        DataService
            .retrieveAll()
            .then(function (data) {
                vm.data = data;
                console.log(vm.data);
                vm.tableParams = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: vm.data.length,
                    getData: function (params) {

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
            .catch(function(err) {
                console.log(err);
            });

        function retrieveAll() {
            console.log("* DataCtrl: retrieveAll");
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