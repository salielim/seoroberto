(function () {
    angular
        .module("DMS")
        .config(uiRouteConfig);

    uiRouteConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function uiRouteConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            // Public
            .state("product", {
                url: "/product",
                templateUrl: "app/static/product.html"
            })
            .state("pricing", {
                url: "/pricing",
                templateUrl: "app/static/pricing.html"
            })
            .state("contact", {
                url: "/contact",
                templateUrl: "app/static/contact.html"
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/login/login.html"
            })
            .state("register", {
                url: "/register",
                templateUrl: "app/register/register.html"
            })
            // .state("logout", {
            //     url: "/logout",
            // })

            // Protected
            .state("scan", {
                url: "/scan",
                templateUrl: "app/protected/scan/scan.html",
                resolve: {
                    authenticated: checkLoggedin
                }
            })
            .state("compare", {
                url: "/compare",
                templateUrl: "app/protected/compare/compare.html",
                resolve: {
                    authenticated: checkLoggedin
                }
            })
            .state("report", {
                url: "/report",
                templateUrl: "app/protected/report/report.html",
                resolve: {
                    authenticated: checkLoggedin
                }
            })
            .state("schedule", {
                url: "/schedule",
                templateUrl: "app/protected/schedule/schedule.html",
                resolve: {
                    authenticated: checkLoggedin
                }
            })
            .state("settings", {
                url: "/settings",
                templateUrl: "app/protected/settings/settings.html",
                resolve: {
                    authenticated: checkLoggedin
                }
            });
        $urlRouterProvider.otherwise('/');
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
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
})();