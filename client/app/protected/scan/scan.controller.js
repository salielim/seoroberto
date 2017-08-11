(function() {
  angular.module("SEO").controller("ScanCtrl", ScanCtrl);

  ScanCtrl.$inject = [
    "$http",
    "$filter",
    "$state",
    "$timeout",
    "DataService",
    "user"
  ];

  function ScanCtrl($http, $filter, $state, $timeout, DataService, user) {
    var vm = this;

    if (!user) {
      $state.go("login");
    }

    vm.domainURL = "";

    vm.retrieveScanned = retrieveScanned;
    vm.result = [];

    vm.todaysDate = new Date().toISOString().slice(0, 10);

    // Scan Animation
    scanProgress();
    function scanProgress() {
      var elem = document.getElementById("scan-bar");
      var width = 1;
      var id = setInterval(frame, 60);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }

    // Table
    vm.columns = [
      {
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

    function retrieveScanned() {
      DataService.retrieveScanned()
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
