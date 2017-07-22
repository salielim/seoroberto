(function () {
    angular
        .module("DMS")
        .controller("IndexCtrl", ["$http", "$q", "$rootScope", "$location", IndexCtrl]);

    IndexCtrl.$inject = ["$http", "$q", "$rootScope", "$location"];

    function IndexCtrl($http, $q, $rootScope, $location) {
        var vm = this;

        vm.logout = function (user) {
            // send a get request to the server
            return $http.get("/logout")
                .then(function (user) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                })
                .catch(function () {
                    console.log("Logout error");
                });
        }
    }
})();