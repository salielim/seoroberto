(function () {
    angular
        .module("SEO")
        .controller("ScanCtrl", ScanCtrl);

    ScanCtrl.$inject = ["$http", "$filter", "$state", "DataService", "user"];

    function ScanCtrl($http, $filter, $state, DataService, user) {

        var vm = this;

        if (!user) {
            $state.go("login");
        }

        vm.domainURL = "";

        vm.retrieveScanned = retrieveScanned;
        vm.result = [];

        vm.todaysDate = new Date().toISOString().slice(0, 10);

        vm.columns = [
            // {
            //     item: "created_at",
            //     name: "Date",
            //     ngShow: true
            // },
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

        // retrieveScanned();
        function retrieveScanned() {
            console.log("* DataCtrl: retrieveScanned");
            DataService
                .retrieveScanned()
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