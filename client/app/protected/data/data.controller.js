(function () {
    angular
        .module("SEO")
        .controller("DataCtrl", DataCtrl)

    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DeptService so
    DataCtrl.$inject = ["$http", "DataService", "$filter"];

    // Scan function declaration
    function DataCtrl($http, DataService, $filter) {

        var vm = this;
        vm.retrieveAll = retrieveAll;
        vm.columns = [{
            item: "created_at",
            name: "Date"
        }, 
        {
            item: "domain_name",
            name: "Domain Name"
        }, 
        {
            item: "url",
            name: "URL"
        }, 
         {
            item: "meta_robots",
            name: "Meta Robots"
        }, 
         {
            item: "title",
            name: "Title"
        }, 
         {
            item: "meta_desc",
            name: "Meta Description"
        }, 
         {
            item: "og_title",
            name: "OG Title"
        }, 
         {
            item: "og_desc",
            name: "OG Desc"
        }]

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