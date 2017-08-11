(function() {
  angular.module("SEO").controller("DataCtrl", DataCtrl);

  DataCtrl.$inject = ["$http", "$filter", "$state", "DataService", "user", "moment"];

  function DataCtrl($http, $filter, $state, DataService, user, moment) {
    var vm = this;
    vm.retrieveAll = retrieveAll;

    if (!user) {
      $state.go("login");
    }

    vm.columns = [
      {
        item: "domain_name",
        name: "Domain",
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
        name: "Open Graph Title",
        ngShow: true,
        length: "40"
      },
      {
        item: "og_desc",
        name: "Open Graph Desc",
        ngShow: true,
        length: "300"
      }
    ];

    retrieveAll();
    function retrieveAll() {
      DataService.retrieveAll()
        .then(function(data) {
          vm.rowList = data;
          vm.displayedCollection = [].concat(vm.rowList);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
})();
