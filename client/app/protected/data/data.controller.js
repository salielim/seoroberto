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
            { field: "created_at", title: "Date", show: true },
            { field: "domain_name", title: "Age", show: true },
            { field: "url", title: "URL", show: true },
            { field: "meta_robots", title: "Meta Robots", show: true },
            { field: "title", title: "Title", show: true },
            { field: "meta_desc", title: "Meta Description", show: true },
            { field: "og_title", title: "OG Title", show: true },
            { field: "og_desc", title: "OG Description", show: true }
        ];

        vm.domains = [{ id: "", title: "" }, { id: 'Domain1', title: 'Domain1' }, { id: 'Domain2', title: 'Domain2' }, { id: 'Domain3', title: 'Domain3' }];

        // vm.result.forEach(function (item) {
        //     if (inArray(item.domain_name, arr) === -1) {
        //         arr.push(item.domain_name);
        //         domains.push({
        //             'id': item.domain_name,
        //             'title': item.domain_name
        //         });
        //     }
        // });
        // }


        //[{id: "", title: ""}, {id: 'Moroni', title: 'Moroni'}, {id: 'Enos', title: 'Enos'}, {id: 'Nephi', title: 'Nephi'}];

        vm.tableParams = new NgTableParams({
            page: 1,
            count: 5
        }, {
                total: vm.result.length,
                getData: function (params) {
                    retrieveAll();

                    // Sorting
                    vm.data = params.sorting() ? $filter('orderBy')(vm.result, params.orderBy()) : vm.result;

                    // Filtering
                    vm.data = params.filter() ? $filter('filter')(vm.data, params.filter()) : vm.data;

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