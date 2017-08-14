(function() {
  angular.module("SEO").controller("ReportCtrl", ReportCtrl);

  ReportCtrl.$inject = ["$state", "user", "DataService"];

  function ReportCtrl($state, user, DataService) {
    var vm = this;

    if (!user) {
      $state.go("login");
    }

    Highcharts.chart("container", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Proportion of indexed and non-indexed pages"
      },
      xAxis: {
        categories: [
          "shopback.sg (11 Aug)",
          "shopback.my (18 Aug)",
          "shopback.sg (18 Aug)",
          "shopback.my (21 Aug)",
          "shopback.sg (22 Aug)"
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: "Total no. of Pages"
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: "normal"
        }
      },
      series: [
        {
          name: "index",
          data: [50, 30, 40, 70, 20]
          // if (data[i].meta_robots == "index")
          // count & push into array
        },
        {
          name: "noindex",
          data: [20, 20, 30, 20, 10]
        },
        {
          name: "Metarobots are not indicated",
          data: [30, 40, 40, 20, 50]
        }
      ]
    });

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
