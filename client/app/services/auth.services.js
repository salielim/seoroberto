(function () {
    angular
        .module("DMS")
        .factory("AuthService", ["$http", "$q", "$rootScope", "$location", function ($http, $q, $rootScope, $location) {

        return ({
            checkLoggedin: checkLoggedin
        });

        function checkLoggedin() {
            var deferred = $q.defer();

            $http.get('/loggedin').then(function (user) {
                $rootScope.errorMessage = null;
                //User is Authenticated
                if (user !== '0') {
                    return true;
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else { //User is not Authenticated
                    return false;
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        }
    }]);
})();