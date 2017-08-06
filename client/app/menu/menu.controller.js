(function () {
    angular
        .module("SEO")
        .controller("MenuCtrl", MenuCtrl);

    MenuCtrl.$inject = ["$http", "$filter", "$state", "DataService"];

    function MenuCtrl($http, $filter, $state, DataService, user)
    {

        var vm = this;

        vm.domainURL = "";
        vm.startScan = startScan;

        function startScan() {
            console.log("scanctrl");
            return $http({
                method: 'POST',
                url: 'api/scan/',
                data: { domain: vm.domainURL }
            })
        }
    }
})();