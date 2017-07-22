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

        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function (user) {
                $rootScope.errorMessage = null;
                //User is Authenticated
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else { //User is not Authenticated
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        }
    }
})();