(function(){
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

        // Protected
        .state("scan", {
            url: "/scan",
            templateUrl: "app/protected/scan/scan.html"
        })
        .state("compare", {
            url: "/compare",
            templateUrl: "app/protected/compare/compare.html"
        })
        .state("report", {
            url: "/report",
            templateUrl: "app/protected/report/report.html"
        })
        .state("schedule", {
            url: "/schedule",
            templateUrl: "app/protected/schedule/schedule.html"
        })
        .state("settings", {
            url: "/settings",
            templateUrl: "app/protected/settings/settings.html"
        });

        $urlRouterProvider.otherwise('/login');
    }
})();