(function () {
    angular
        .module("SEO")
        .controller("ReportCtrl", ReportCtrl)

    ReportCtrl.$inject = ["$state", "user", "DataService"];

    function ReportCtrl($state, user, DataService) {

        var vm = this;

        if (!user) {
            $state.go("login");
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Scanned Pages'
            },
            xAxis: {
                categories: ["shopback.sg (11 Aug)", "shopback.my (18 Aug)", "shopback.sg (18 Aug)", "shopback.my (21 Aug)", "shopback.sg (22 Aug)"]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total no. of Pages'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'index',
                data: [5, 3, 4, 7, 2]
                // if (data[i].meta_robots == "index")
                // count & push into array
            }, {
                name: 'noindex',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'N.A.',
                data: [3, 4, 4, 2, 5]
            }]
        });

        retrieveAll();
        function retrieveAll() {
            DataService
                .retrieveAll()
                .then(function (data) {
                    vm.rowList = data;
                    vm.displayedCollection = [].concat(vm.rowList);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

    }

})();