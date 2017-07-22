(function () {
    angular
        .module("DMS")
        .service("AuthService", AuthService);

    AuthService.$inject = ["$http", "$q", "$rootScope", "$location"];

    // AuthService
    function AuthService ($q, $timeout, $http, $location, $rootScope) {

        var service = this;
        service.checkLoggedin = checkLoggedin;
        
        function checkLoggedin() {
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