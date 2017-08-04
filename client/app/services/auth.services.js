(function () {
    angular
        .module("SEO")
        .factory("AuthService", ["$http", "$q", "$rootScope", "$location",
            function ($http, $q, $rootScope, $location) {
                
                var user = null;

                return ({
                    checkLoggedin: checkLoggedin,
                    userAuth: userAuth
                });

                function userAuth() {
                    return $http.get(
                        '/user/auth',
                    );
                }

                function checkLoggedin() {
                    var deferred = $q.defer();

                    $http.get('/loggedin').then(function (user) {
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
            }]);
})();