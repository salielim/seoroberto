(function () {
    angular
        .module("SEO")
        .controller("DataCtrl", DataCtrl)
        .directive('stFilteredCollection', function () {
            return {
                require: '^stTable',
                link: function (scope, element, attr, ctrl) {
                    scope.$watch(ctrl.getFilteredCollection, function (val) {
                        scope.filteredCollection = val;
                    })
                }
            }
        });

    DataCtrl.$inject = ["$http", "DataService", "$filter"];

    function DataCtrl($http, DataService, $filter) {

        var vm = this;
        vm.retrieveAll = retrieveAll;

        vm.columns = [{
            item: "created_at",
            name: "Date",
            ngShow: true
        },
        {
            item: "domain_name",
            name: "Domain Name",
            ngShow: true
        },
        {
            item: "url",
            name: "URL",
            ngShow: true
        },
        {
            item: "meta_robots",
            name: "Meta Robots",
            ngShow: true
        },
        {
            item: "title",
            name: "Title",
            ngShow: true,
            length: "70"
        },
        {
            item: "meta_desc",
            name: "Meta Description",
            ngShow: true,
            length: "156"
        },
        {
            item: "og_title",
            name: "OG Title",
            ngShow: true,
            length: "40"
        },
        {
            item: "og_desc",
            name: "OG Desc",
            ngShow: true,
            length: "300"
        }]


        retrieveAll()
        function retrieveAll() {
            console.log("* DataCtrl: retrieveAll");
            DataService
                .retrieveAll()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.rowList = data;
                    vm.displayedCollection = [].concat(vm.rowList);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }
    }
})();