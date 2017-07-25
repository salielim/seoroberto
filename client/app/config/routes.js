(function () {
    angular
        .module("DMS")
        .config(uiRouteConfig);

    uiRouteConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function uiRouteConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            // Public
            .state("index", {
                url: "/",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/static/product.html"
                    }
                }
                // resolve: {
                //     user: function (PassportSvc) {
                //         return PassportSvc.userAuth()
                //             .then(function (result) {
                //                 return result.data.user;
                //             })
                //             .catch(function (err) {
                //                 return "";
                //             });
                //     }
                // },
            })
            .state("product", {
                url: "/product",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/static/product.html"
                    }
                }
            })
            .state("pricing", {
                url: "/pricing",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/static/pricing.html"
                    }
                }
            })
            .state("contact", {
                url: "/contact",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/static/contact.html"
                    }
                }
            })
            .state("login", {
                url: "/login",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/login/login.html"
                    }
                }
            })
            .state("register", {
                url: "/register",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/register/register.html"
                    }
                }
            })
            // .state("logout", {
            //     url: "/logout",
            // })

            // Protected
            .state("data", {
                url: "/data",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/protected/data/data.html",
                        controller: "DataCtrl",
                        controllerAs: "dataCtrl"
                    }
                    // resolve: {
                    //     authenticated: checkLoggedin
                    // }
                },
            })
            .state("compare", {
                url: "/compare",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/protected/compare/compare.html"
                        // controller: "CompareCtrl",
                        // controllerAs: "compareCtrl"
                    }
                }
            })
            .state("report", {
                url: "/report",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/protected/report/report.html",
                        // controller: "ReportCtrl",
                        // controllerAs: "reportCtrl"
                    }
                }
            })
            .state("schedule", {
                url: "/schedule",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/protected/schedule/schedule.html",
                        // controller: "ScheduleCtrl",
                        // controllerAs: "scheduleCtrl"
                    }
                }
            })
            .state("settings", {
                url: "/settings",
                views: {
                    'menu': {
                        templateUrl: "app/menu/menu.html"
                    },
                    'content': {
                        templateUrl: "app/protected/settings/settings.html",
                        controller: "SettingsCtrl",
                        controllerAs: "settingCtrl"
                    }
                }
            });
        $urlRouterProvider.otherwise("/");
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get("/loggedin").then(function (user) {
            $rootScope.errorMessage = null;
            //User is Authenticated
            if (user !== "0") {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else { //User is not Authenticated
                $rootScope.errorMessage = "You need to log in.";
                deferred.reject();
                $location.url("/login");
            }
        });
        return deferred.promise;
    }
})();