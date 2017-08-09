(function() {
  angular.module("SEO").config(uiRouteConfig);

  uiRouteConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

  function uiRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // Public
      .state("index", {
        url: "/",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/static/product.html"
          }
        }
      })
      .state("product", {
        url: "/product",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/static/product.html"
          }
        }
      })
      .state("pricing", {
        url: "/pricing",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/static/pricing.html"
          }
        }
      })
      .state("contact", {
        url: "/contact",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/static/contact.html"
          }
        }
      })
      .state("login", {
        url: "/login",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/login/login.html"
          }
        }
      })
      .state("register", {
        url: "/register",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/register/register.html"
          }
        }
      })
      // Protected
      .state("data", {
        url: "/data",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/protected/data/data.html",
            controller: "DataCtrl",
            controllerAs: "dataCtrl"
          }
        },
        resolve: {
          user: function(AuthService) {
            return AuthService.userAuth()
              .then(function(result) {
                return result.data.user;
              })
              .catch(function(err) {
                console.log(err);
                return "";
              });
          }
        }
      })
      .state("scan", {
        url: "/scan",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/protected/scan/scan.html",
            controller: "ScanCtrl",
            controllerAs: "scanCtrl"
          }
        },
        resolve: {
          user: function(AuthService) {
            return AuthService.userAuth()
              .then(function(result) {
                return result.data.user;
              })
              .catch(function(err) {
                console.log(err);
                return "";
              });
          }
        }
      })
      .state("report", {
        url: "/report",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/protected/report/report.html",
            controller: "ReportCtrl",
            controllerAs: "reportCtrl"
          }
        },
        resolve: {
          user: function(AuthService) {
            return AuthService.userAuth()
              .then(function(result) {
                return result.data.user;
              })
              .catch(function(err) {
                console.log(err);
                return "";
              });
          }
        }
      })
      .state("schedule", {
        url: "/schedule",
        views: {
          menu: {
            templateUrl: "app/menu/menu.html"
          },
          content: {
            templateUrl: "app/protected/schedule/schedule.html",
            controller: "ScheduleCtrl",
            controllerAs: "scheduleCtrl"
          }
        },
        resolve: {
          user: function(AuthService) {
            return AuthService.userAuth()
              .then(function(result) {
                return result.data.user;
              })
              .catch(function(err) {
                console.log(err);
                return "";
              });
          }
        }
      })
    $urlRouterProvider.otherwise("/");
  }
})();
